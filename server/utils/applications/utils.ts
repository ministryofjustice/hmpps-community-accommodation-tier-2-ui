import type { ApplicationDocument, FormPages, JourneyType, SideNavItem, UiTimelineEvent } from '@approved-premises/ui'
import type {
  Cas2Application as Application,
  Cas2Application,
  Cas2SubmittedApplication,
  Cas2TimelineEvent,
} from '@approved-premises/api'
import { getSections } from '../checkYourAnswersUtils'
import { stringToKebabCase, formatCommaToLinebreak } from '../utils'
import Apply from '../../form-pages/apply'
import paths from '../../paths/apply'
import { DateFormats } from '../dateUtils'
import config from '../../config'

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

export const firstPageOfConsentTask = (application: Application) => {
  return paths.applications.pages.show({ id: application.id, task: 'confirm-consent', page: 'confirm-consent' })
}

export const consentIsConfirmed = (application: Application): boolean => {
  return consentAnswer(application) === 'yes'
}
export const consentIsDenied = (application: Application): boolean => {
  return consentAnswer(application) === 'no'
}

const consentAnswer = (application: Application): string => {
  return application.data?.['confirm-consent']?.['confirm-consent']?.hasGivenConsent
}

export const getTimelineEvents = (timelineEvents: Array<Cas2TimelineEvent>): Array<UiTimelineEvent> => {
  if (timelineEvents) {
    return timelineEvents
      .sort((a, b) => Number(DateFormats.isoToDateObj(b.occurredAt)) - Number(DateFormats.isoToDateObj(a.occurredAt)))
      .map(sortedTimelineEvents => {
        const description =
          sortedTimelineEvents.type === 'cas2_status_update' && sortedTimelineEvents.body
            ? formatCommaToLinebreak(sortedTimelineEvents.body)
            : sortedTimelineEvents.body

        return {
          label: { text: sortedTimelineEvents.label },
          byline: {
            text: sortedTimelineEvents.createdByName,
          },
          datetime: {
            timestamp: sortedTimelineEvents.occurredAt,
            date: DateFormats.isoDateTimeToUIDateTime(sortedTimelineEvents.occurredAt),
          },
          description: {
            text: description,
          },
        }
      })
  }
  return []
}

export const getApplicationTimelineEvents = (
  application: Cas2Application | Cas2SubmittedApplication,
): Array<UiTimelineEvent> => {
  const timelineEvents =
    config.flags.notesDisabled === 'false'
      ? application.timelineEvents
      : application.timelineEvents.filter(event => event.type !== 'cas2_note')

  return [...getTimelineEvents(timelineEvents)]
}

export const generateSuccessMessage = (pageName: string): string => {
  switch (pageName) {
    case 'current-offence-data':
      return 'The offence has been saved'
    case 'offence-history-data':
      return 'The offence has been saved'
    case 'behaviour-notes-data':
      return 'The behaviour note has been saved'
    case 'acct-data':
      return 'The ACCT has been saved'
    default:
      return ''
  }
}

export const getSideNavLinksForDocument = (document: ApplicationDocument) => {
  const tasks: Array<SideNavItem> = []

  document.sections.forEach(section => {
    section.tasks.forEach(task => tasks.push({ href: `#${stringToKebabCase(task.title)}`, text: task.title }))
  })

  return tasks
}

export const getSideNavLinksForApplication = () => {
  const sections = getSections()

  const tasks: Array<SideNavItem> = []

  sections.forEach(section => {
    section.tasks.forEach(task => tasks.push({ href: `#${stringToKebabCase(task.title)}`, text: task.title }))
  })

  return tasks
}
