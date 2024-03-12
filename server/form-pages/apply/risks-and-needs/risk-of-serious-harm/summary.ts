import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application, RoshRisksEnvelope } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { DateFormats } from '../../../../utils/dateUtils'
import { getOasysImportDateFromApplication } from '../../../utils'
import { getQuestions } from '../../../utils/questions'

export type SummaryBody = {
  additionalComments?: string
}

export type SummaryData = RoshRisksEnvelope & {
  oasysImportedDate: Date
  oasysStartedDate: string
  oasysCompletedDate?: string
}

@Page({
  name: 'summary',
  bodyProperties: ['additionalComments'],
})
export default class Summary implements TaskListPage {
  documentTitle = 'Risk of serious harm (RoSH) summary for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Risk of serious harm (RoSH) summary for ${this.personName}`

  body: SummaryBody

  risks: SummaryData

  questions: {
    additionalComments: string
  }

  importDate = getOasysImportDateFromApplication(this.application, 'risk-of-serious-harm')

  constructor(
    body: Partial<SummaryBody>,
    private readonly application: Application,
  ) {
    this.body = body as SummaryBody
    this.application = application

    if (this.isSummaryDataRetrieved(application)) {
      const summaryData = application.data['risk-of-serious-harm']['summary-data'] as SummaryData
      this.risks = {
        ...summaryData,
      }
    }
    const roshQuestions = getQuestions(this.personName)['risk-of-serious-harm']

    this.questions = {
      additionalComments: roshQuestions.summary.additionalComments.question,
    }
  }

  private isSummaryDataRetrieved(application: Application) {
    return application.data['risk-of-serious-harm']?.['summary-data']?.status === 'retrieved'
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'risk-to-others'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }

  response() {
    let response = {}
    if (this.isSummaryDataRetrieved(this.application)) {
      const oasysData = this.application.data['risk-of-serious-harm']['summary-data']
      response = {
        'OASys created': DateFormats.isoDateToUIDate(oasysData.oasysStartedDate, { format: 'medium' }),
        'OASys completed': oasysData.oasysCompletedDate
          ? DateFormats.isoDateToUIDate(oasysData.oasysCompletedDate, { format: 'medium' })
          : 'Unknown',
        'OASys imported': DateFormats.dateObjtoUIDate(oasysData.oasysImportedDate, { format: 'medium' }),
        'Overall risk rating': oasysData.value.overallRisk,
        'Risk to children': oasysData.value.riskToChildren,
        'Risk to known adult': oasysData.value.riskToKnownAdult,
        'Risk to public': oasysData.value.riskToPublic,
        'Risk to staff': oasysData.value.riskToStaff,
      }
    }
    if (this.body.additionalComments) {
      response[this.questions.additionalComments] = this.body.additionalComments
    }
    return response
  }
}
