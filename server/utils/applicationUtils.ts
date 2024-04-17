import type { Cas2SubmittedApplicationSummary, Cas2ApplicationSummary } from '@approved-premises/api'
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

const textValue = (value: string) => {
  return { text: value }
}
