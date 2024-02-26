import { isAfter } from 'date-fns'
import { applicationFactory, submittedApplicationFactory, timelineEventsFactory } from '../../testutils/factories'
import {
  eligibilityQuestionIsAnswered,
  getApplicationTimelineEvents,
  getSideNavLinksForDocument,
  getSideNavLinksForApplication,
} from './utils'
import { DateFormats } from '../dateUtils'
import { getSections } from '../checkYourAnswersUtils'
import config from '../../config'

jest.mock('../checkYourAnswersUtils')

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
      config.flags.notesDisabled = 'false'
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

    describe('when the feature flag is disabled', () => {
      it('does not include events with the type "cas2_note"', () => {
        config.flags.notesDisabled = 'true'

        const application = submittedApplicationFactory.build({
          timelineEvents: [
            timelineEventsFactory.build({
              type: 'cas2_status_update',
              label: 'cas2_status_update',
            }),
            timelineEventsFactory.build({
              type: 'cas2_note',
              label: 'cas2_note',
            }),
          ],
        })

        expect(getApplicationTimelineEvents(application).length).toEqual(1)
        expect(getApplicationTimelineEvents(application)[0].label.text).toEqual('cas2_status_update')
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
})
