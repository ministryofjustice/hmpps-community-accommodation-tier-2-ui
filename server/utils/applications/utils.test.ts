import { isAfter } from 'date-fns'
import {
  applicationFactory,
  externalUserFactory,
  nomisUserFactory,
  statusUpdateFactory,
  submittedApplicationFactory,
} from '../../testutils/factories'
import {
  eligibilityQuestionIsAnswered,
  getApplicationTimelineEvents,
  getSideNavLinksForDocument,
  getSideNavLinksForApplication,
} from './utils'
import { DateFormats } from '../dateUtils'
import { getSections } from '../checkYourAnswersUtils'

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
    describe('when there are status updates', () => {
      it('returns them in the timeline events', () => {
        const application = submittedApplicationFactory.build({
          statusUpdates: [
            statusUpdateFactory.build({
              label: 'a status update',
              description: 'the status description',
              updatedBy: externalUserFactory.build({ name: 'A Nacro' }),
              updatedAt: '2023-06-22T08:54:50',
            }),
          ],
          submittedBy: nomisUserFactory.build({ name: 'Anne Nomis' }),
          submittedAt: '2023-06-21T07:54:50',
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
          statusUpdates: [
            statusUpdateFactory.build({
              label: 'a status update',
              description: 'the status description',
              updatedBy: externalUserFactory.build(),
              updatedAt: '2023-06-22T08:54:50',
            }),
            statusUpdateFactory.build({
              label: 'a status update',
              description: 'the status description',
              updatedBy: externalUserFactory.build(),
              updatedAt: '2023-06-20T08:54:50',
            }),
            statusUpdateFactory.build({
              label: 'a status update',
              description: 'the status description',
              updatedBy: externalUserFactory.build(),
              updatedAt: '2023-06-23T08:54:50',
            }),
          ],
          submittedBy: nomisUserFactory.build(),
          submittedAt: '2023-06-21T07:54:50',
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
    })

    describe('when there are no status updates', () => {
      it('just returns the application submitted info', () => {
        const application = submittedApplicationFactory.build({
          statusUpdates: undefined,
          submittedBy: nomisUserFactory.build({ name: 'Anne Nomis' }),
          submittedAt: '2023-06-21T07:54:50',
        })
        expect(getApplicationTimelineEvents(application)).toEqual([
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
