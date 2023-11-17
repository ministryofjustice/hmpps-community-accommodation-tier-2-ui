import type { FormPages, JourneyType, UiTimelineEvent } from '@approved-premises/ui'
import type { Cas2Application as Application, Cas2StatusUpdate, Cas2SubmittedApplication } from '@approved-premises/api'
import Apply from '../../form-pages/apply'
import paths from '../../paths/apply'
import { DateFormats } from '../dateUtils'

export const journeyPages = (_journeyType: JourneyType): FormPages => {
  return Apply.pages
}

export const firstPageOfBeforeYouStartSection = (application: Application) => {
  return paths.applications.pages.show({ id: application.id, task: 'confirm-eligibility', page: 'confirm-eligibility' })
}

export const eligibilityQuestionIsAnswered = (application: Application): boolean => {
  return eligibilityAnswer(application) === 'yes' || eligibilityAnswer(application) === 'no'
}

export const eligibilityIsConfirmed = (application: Application): boolean => {
  return eligibilityAnswer(application) === 'yes'
}
export const eligibilityIsDenied = (application: Application): boolean => {
  return eligibilityAnswer(application) === 'no'
}

const eligibilityAnswer = (application: Application): string => {
  return application.data?.['confirm-eligibility']?.['confirm-eligibility']?.isEligible
}

export const getStatusTimelineEvents = (statusUpdates: Array<Cas2StatusUpdate>): Array<UiTimelineEvent> => {
  if (statusUpdates) {
    return statusUpdates
      .sort((a, b) => Number(DateFormats.isoToDateObj(b.updatedAt)) - Number(DateFormats.isoToDateObj(a.updatedAt)))
      .map(statusUpdate => {
        return {
          label: { text: statusUpdate.label },
          byline: {
            // TODO: change this to first name/surname when that is available on external users
            text: statusUpdate.updatedBy.username,
          },
          datetime: {
            timestamp: statusUpdate.updatedAt,
            date: DateFormats.isoDateTimeToUIDateTime(statusUpdate.updatedAt),
          },
          description: {
            text: statusUpdate.description,
          },
        }
      })
  }
  return []
}

export const getSubmittedTimelineEvent = (submitterName: string, submittedAt: string): UiTimelineEvent => {
  return {
    label: { text: 'Application submitted' },
    byline: {
      text: submitterName,
    },
    datetime: {
      timestamp: submittedAt,
      date: DateFormats.isoDateTimeToUIDateTime(submittedAt),
    },
    description: {
      text: 'The application was received by an assessor.',
    },
  }
}

export const getApplicationTimelineEvents = (application: Cas2SubmittedApplication): Array<UiTimelineEvent> => {
  return [
    ...getStatusTimelineEvents(application.statusUpdates),
    getSubmittedTimelineEvent(application.submittedBy.name, application.submittedAt),
  ]
}
