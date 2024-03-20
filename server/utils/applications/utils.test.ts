import { isAfter } from 'date-fns'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import type { Request, Response } from 'express'
import { applicationFactory, submittedApplicationFactory, timelineEventsFactory } from '../../testutils/factories'
import {
  eligibilityQuestionIsAnswered,
  getApplicationTimelineEvents,
  getSideNavLinksForDocument,
  getSideNavLinksForApplication,
  showMissingRequiredTasksOrTaskList,
} from './utils'
import { fetchErrorsAndUserInput } from '../validation'
import { DateFormats } from '../dateUtils'
import { getSections } from '../checkYourAnswersUtils'
import config from '../../config'
import paths from '../../paths/apply'
import { TaskListService } from '../../services'
import { formatLines, validateReferer } from '../viewUtils'

jest.mock('../../services/taskListService')
jest.mock('../checkYourAnswersUtils')
jest.mock('../../utils/validation')
jest.mock('../../utils/viewUtils')

const mockSections = [
  {
    title: 'Section 1',
    tasks: [
      {
        title: 'Task 1',
        questionsAndAnswers: [
          {
            question: 'a question',
            answer: 'an answer',
          },
        ],
      },
    ],
  },
  {
    title: 'Section 2',
    tasks: [
      {
        title: 'Task 2',
        questionsAndAnswers: [
          {
            question: 'a question',
            answer: 'an answer',
          },
        ],
      },
    ],
  },
]

describe('utils', () => {
  describe('eligibilityQuestionIsAnswered', () => {
    describe('when the isEligible property is _yes_', () => {
      it('returns true', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'yes' },
            },
          },
        })

        expect(eligibilityQuestionIsAnswered(application)).toEqual(true)
      })
    })

    describe('when the isEligible property is _no_', () => {
      it('returns true', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'no' },
            },
          },
        })

        expect(eligibilityQuestionIsAnswered(application)).toEqual(true)
      })
    })

    describe('when the isEligible property is something else', () => {
      it('returns false', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'something else' },
            },
          },
        })

        expect(eligibilityQuestionIsAnswered(application)).toEqual(false)
      })
    })

    describe('when the isEligible property is missing', () => {
      it('returns false', async () => {
        const application = applicationFactory.build({
          data: {},
        })

        expect(eligibilityQuestionIsAnswered(application)).toEqual(false)
      })

      it('returns false', async () => {
        const application = applicationFactory.build({
          data: null,
        })

        expect(eligibilityQuestionIsAnswered(application)).toEqual(false)
      })
    })
  })
  describe('getApplicationTimelineEvents', () => {
    const priorConfigFlags = config.flags

    afterAll(() => {
      config.flags = priorConfigFlags
    })

    describe('when there are timeline events', () => {
      it('returns them in the timeline events', () => {
        const application = submittedApplicationFactory.build({
          timelineEvents: [
            timelineEventsFactory.build({
              label: 'a status update',
              body: 'the status description',
              createdByName: 'A Nacro',
              occurredAt: '2023-06-22T08:54:50',
            }),
            timelineEventsFactory.build({
              type: 'cas2_application_submitted',
              label: 'Application submitted',
              body: 'The application was received by an assessor.',
              createdByName: 'Anne Nomis',
              occurredAt: '2023-06-21T07:54:50',
            }),
          ],
        })

        ;(formatLines as jest.MockedFunction<typeof formatLines>).mockReturnValue(
          'The application was received by an assessor.',
        )

        expect(getApplicationTimelineEvents(application)).toEqual([
          {
            byline: {
              text: 'A Nacro',
            },
            datetime: {
              date: '22 June 2023 at 08:54am',
              timestamp: '2023-06-22T08:54:50',
            },
            description: {
              text: 'the status description',
            },
            label: {
              text: 'a status update',
            },
          },
          {
            byline: {
              text: 'Anne Nomis',
            },
            datetime: {
              date: '21 June 2023 at 07:54am',
              timestamp: '2023-06-21T07:54:50',
            },
            description: {
              text: 'The application was received by an assessor.',
            },
            label: {
              text: 'Application submitted',
            },
          },
        ])
      })

      it('sorts the events in ascending order', () => {
        const application = submittedApplicationFactory.build({
          timelineEvents: [
            timelineEventsFactory.build({
              label: 'a status update',
              body: 'the status description',
              createdByName: 'A Nacro',
              occurredAt: '2023-06-22T08:54:50',
            }),
            timelineEventsFactory.build({
              label: 'a status update',
              body: 'the status description',
              createdByName: 'A Nacro',
              occurredAt: '2023-06-27T08:54:50',
            }),
            timelineEventsFactory.build({
              label: 'a status update',
              body: 'the status description',
              createdByName: 'A Nacro',
              occurredAt: '2023-06-20T08:54:50',
            }),
            timelineEventsFactory.build({
              type: 'cas2_application_submitted',
              label: 'Application submitted',
              body: 'The application was received by an assessor.',
              createdByName: 'Anne Nomis',
              occurredAt: '2023-06-19T07:54:50',
            }),
          ],
        })

        const actual = getApplicationTimelineEvents(application)

        expect(
          isAfter(
            DateFormats.isoToDateObj(actual[0].datetime.timestamp),
            DateFormats.isoToDateObj(actual[1].datetime.timestamp),
          ),
        ).toEqual(true)

        expect(
          isAfter(
            DateFormats.isoToDateObj(actual[0].datetime.timestamp),
            DateFormats.isoToDateObj(actual[2].datetime.timestamp),
          ),
        ).toEqual(true)

        expect(
          isAfter(
            DateFormats.isoToDateObj(actual[1].datetime.timestamp),
            DateFormats.isoToDateObj(actual[2].datetime.timestamp),
          ),
        ).toEqual(true)
      })

      describe('when the timeline event is a status update', () => {
        it('formats the description text', () => {
          const application = submittedApplicationFactory.build({
            timelineEvents: [
              timelineEventsFactory.build({
                body: 'the status description, and another, and another',
              }),
            ],
          })
          expect(getApplicationTimelineEvents(application)[0].description.text).toEqual(
            'the status description<br>and another<br>and another',
          )
        })
      })
    })
  })

  describe('getSideNavLinksForDocument', () => {
    it('returns an array with a side nav item for each task', () => {
      const document = {
        sections: mockSections,
      }

      expect(getSideNavLinksForDocument(document)).toEqual([
        { text: 'Task 1', href: '#task-1' },
        { text: 'Task 2', href: '#task-2' },
      ])
    })
  })

  describe('getSideNavLinksForApplication', () => {
    it('returns an array with a side nav item for each task', () => {
      ;(getSections as jest.Mock).mockReturnValue(mockSections)

      expect(getSideNavLinksForApplication()).toEqual([
        { text: 'Task 1', href: '#task-1' },
        { text: 'Task 2', href: '#task-2' },
      ])
    })
  })

  describe('showMissingRequiredTasksOrTaskList', () => {
    const request: DeepMocked<Request> = createMock<Request>({ user: { token: 'SOME_TOKEN' } })
    const response: DeepMocked<Response> = createMock<Response>({})

    describe('when "Confirm eligibility" task is NOT complete', () => {
      it('renders "Confirm eligibility" page from the "Before you start" section', async () => {
        const application = applicationFactory.build({ data: {} })

        const actual = showMissingRequiredTasksOrTaskList(request, response, application)

        expect(actual).toEqual(
          response.redirect(
            paths.applications.pages.show({
              id: application.id,
              task: 'confirm-eligibility',
              page: 'confirm-eligibility',
            }),
          ),
        )
      })
    })

    describe('when "Confirm eligibility" task is complete and the candidate is INELIGIBLE', () => {
      it('renders the "ineligible" page', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'no' },
            },
          },
        })

        const actual = showMissingRequiredTasksOrTaskList(request, response, application)

        expect(actual).toEqual(response.redirect(paths.applications.ineligible({ id: application.id })))
      })
    })

    describe('when the person is confirmed ELIGIBLE but consent has been DENIED', () => {
      it('redirects to the _consent refused_ page', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'yes' },
            },
            'confirm-consent': {
              'confirm-consent': {
                hasGivenConsent: 'no',
                consentRefusalDetail: 'some reason',
              },
            },
          },
        })

        const actual = showMissingRequiredTasksOrTaskList(request, response, application)

        expect(actual).toEqual(response.redirect(paths.applications.consentRefused({ id: application.id })))
      })
    })

    describe('when the person is confirmed ELIGIBLE but the consent task has not been completed', () => {
      it('redirects to the _confirm consent_ page', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'yes' },
            },
          },
        })

        const actual = showMissingRequiredTasksOrTaskList(request, response, application)

        expect(actual).toEqual(
          response.redirect(
            paths.applications.pages.show({
              id: application.id,
              task: 'confirm-consent',
              page: 'confirm-consent',
            }),
          ),
        )
      })
    })
    describe('when the person is confirmed ELIGIBLE and consent is confirmed, but the HDC licence dates task has not been completed', () => {
      it('redirects to the _HDC licence dates_ page', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'yes' },
            },
            'confirm-consent': {
              'confirm-consent': {
                hasGivenConsent: 'yes',
                consentDate: '2022-02-22',
                'consentDate-year': '2022',
                'consentDate-month': '2',
                'consentDate-day': '22',
              },
            },
            'hdc-licence-dates': {
              'hdc-licence-dates': {
                hdcEligibilityDate: '2024-02-28',
                'hdcEligibilityDate-year': '2024',
                'hdcEligibilityDate-month': '2',
                'hdcEligibilityDate-day': '28',
                conditionalReleaseDate: '2024-02-22',
                'conditionalReleaseDate-year': '2024',
                'conditionalReleaseDate-month': '2',
                'conditionalReleaseDate-day': '22',
              },
            },
          },
        })

        const stubTaskList = jest.fn()
        ;(TaskListService as jest.Mock).mockImplementation(() => {
          return stubTaskList
        })
        ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
          return { errors: {}, errorSummary: [], userInput: {} }
        })
        ;(validateReferer as jest.MockedFunction<typeof validateReferer>).mockReturnValue('some-validated-referer')

        const actual = showMissingRequiredTasksOrTaskList(request, response, application)

        expect(actual).toEqual(
          response.render('applications/taskList', {
            application,
            taskList: stubTaskList,
            errors: {},
            errorSummary: [],
            referrer: 'some-validated-referer',
          }),
        )
      })
    })

    describe('when eligibility and consent have been confirmed, and HDC dates have been entered', () => {
      it('redirects to the _task list_ page', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'yes' },
            },
            'confirm-consent': {
              'confirm-consent': {
                hasGivenConsent: 'yes',
                consentDate: '2022-02-22',
                'consentDate-year': '2022',
                'consentDate-month': '2',
                'consentDate-day': '22',
              },
            },
          },
        })

        const actual = showMissingRequiredTasksOrTaskList(request, response, application)

        expect(actual).toEqual(
          response.redirect(
            paths.applications.pages.show({
              id: application.id,
              task: 'hdc-licence-dates',
              page: 'hdc-licence-dates',
            }),
          ),
        )
      })
    })
  })
})
