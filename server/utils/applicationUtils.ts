import type { Cas2SubmittedApplicationSummary, Cas2ApplicationSummary, Cas2Application } from '@approved-premises/api'
import type { QuestionAndAnswer, TableRow } from '@approved-premises/ui'
import applyPaths from '../paths/apply'
import assessPaths from '../paths/assess'
import { DateFormats } from './dateUtils'
import { formatLines } from './viewUtils'

export const inProgressApplicationTableRows = (applications: Array<Cas2ApplicationSummary>): Array<TableRow> => {
  return applications.map(application => {
    return [
      nameAnchorElement(application.personName, application.id, false, true),
      textValue(application.nomsNumber),
      textValue(application.crn),
      textValue(DateFormats.isoDateToUIDate(application.createdAt, { format: 'medium' })),
      cancelAnchorElement(application.id),
    ]
  })
}

export const submittedApplicationTableRows = (
  applications: Array<Cas2ApplicationSummary>,
  isAssessPath: boolean = false,
): Array<TableRow> => {
  return applications.map(application => {
    return [
      nameAnchorElement(application.personName, application.id, isAssessPath),
      textValue(application.nomsNumber),
      textValue(application.crn),
      textValue(DateFormats.isoDateToUIDate(application.submittedAt, { format: 'medium' })),
      htmlValue(getStatusTag(application.latestStatusUpdate?.label, application.latestStatusUpdate?.statusId)),
    ]
  })
}

export const prisonDashboardTableRows = (applications: Array<Cas2ApplicationSummary>): Array<TableRow> => {
  return applications.map(application => {
    return [
      nameAnchorElement(application.personName, application.id),
      textValue(application.nomsNumber),
      textValue(application.createdByUserName),
      application.hdcEligibilityDate
        ? textValue(DateFormats.isoDateToUIDate(application.hdcEligibilityDate, { format: 'medium' }))
        : null,
      htmlValue(getStatusTag(application.latestStatusUpdate?.label, application.latestStatusUpdate?.statusId)),
    ]
  })
}

export const assessmentsTableRows = (applications: Array<Cas2SubmittedApplicationSummary>): Array<TableRow> => {
  return applications.map(application => {
    return [
      nameAnchorElement(application.personName, application.id, true),
      textValue(application.nomsNumber),
      textValue(application.crn),
      textValue(DateFormats.isoDateToUIDate(application.submittedAt, { format: 'medium' })),
    ]
  })
}

export const documentSummaryListRows = (questionsAndAnswers: Array<QuestionAndAnswer>) => {
  return questionsAndAnswers.map(question => {
    return {
      key: {
        html: question.question,
      },
      value: {
        html: formatLines(question.answer),
      },
    }
  })
}

const htmlValue = (value: string) => {
  return { html: value }
}

const nameAnchorElement = (
  name: string,
  applicationId: string,
  isAssessPath: boolean = false,
  inProgress: boolean = false,
) => {
  let href = ''
  if (inProgress) {
    href = applyPaths.applications.show({ id: applicationId })
  } else if (isAssessPath) {
    href = assessPaths.submittedApplications.overview({ id: applicationId })
  } else {
    href = applyPaths.applications.overview({ id: applicationId })
  }
  return htmlValue(`<a href=${href} data-cy-id="${applicationId}">${name}</a>`)
}

const cancelAnchorElement = (applicationId: string) =>
  htmlValue(`<a id="cancel-${applicationId}" href=${applyPaths.applications.cancel({ id: applicationId })}>Cancel</a>`)

const textValue = (value: string) => {
  return { text: value }
}

export const getStatusTag = (statusLabel: string, statusId: string) => {
  return `<strong class="govuk-tag govuk-tag--${getStatusTagColour(statusId)}">${statusLabel || 'Received'}</strong>`
}

const getStatusTagColour = (statusId: string) => {
  // status IDs located at https://github.com/ministryofjustice/hmpps-approved-premises-api/blob/main/src/main/kotlin/uk/gov/justice/digital/hmpps/approvedpremisesapi/model/reference/Cas2ApplicationStatusSeeding.kt
  switch (statusId) {
    case 'f5cd423b-08eb-4efb-96ff-5cc6bb073905':
      return 'light-blue'
    case 'ba4d8432-250b-4ab9-81ec-7eb4b16e5dd1':
      return 'yellow'
    case 'a919097d-b324-471c-9834-756f255e87ea':
      return 'yellow'
    case '176bbda0-0766-4d77-8d56-18ed8f9a4ef2':
      return 'purple'
    case 'fe254d88-ce1d-4cd8-8bd6-88de88f39019':
      return 'green'
    case '9a381bc6-22d3-41d6-804d-4e49f428c1de':
      return 'orange'
    case '004e2419-9614-4c1e-a207-a8418009f23d':
      return 'pink'
    case 'f13bbdd6-44f1-4362-b9d3-e6f1298b1bf9':
      return 'pink'
    case '89458555-3219-44a2-9584-c4f715d6b565':
      return 'green'
    default:
      return 'grey'
  }
}

export const hasOasys = (application: Cas2Application, task: 'risk-to-self' | 'risk-of-serious-harm'): boolean => {
  if (application.data[task]?.['oasys-import'] || application.data[task]?.['old-oasys']?.hasOldOasys === 'yes') {
    return true
  }
  return false
}

export const arePreTaskListTasksIncomplete = (application: Cas2Application): boolean => {
  if (
    application.data?.['confirm-eligibility'] &&
    application.data?.['confirm-consent'] &&
    application.data?.['hdc-licence-dates']
  ) {
    return false
  }
  return true
}
