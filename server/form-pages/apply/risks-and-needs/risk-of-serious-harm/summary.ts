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
  oasysImportedDate?: Date
  oasysStartedDate?: string
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

    console.log('applicaton data from summary page: ', this.application.data)

    if (this.isSummaryDataRetrieved(application)) {
      console.log('Use imported OASys data')
      // Use imported OASys data
      const summaryData = application.data['risk-of-serious-harm']['summary-data'] as SummaryData
      this.risks = { ...summaryData }
    } else if (this.isManualDataAvailable(application)) {
      // Use manually entered data, transformed into the same format
      const manualData = application.data['risk-of-serious-harm']['manual-rosh-information']

      // Need a new type created here maybe 'ManualData'
      this.risks = {
        oasysImportedDate: manualData.lastUpdated,
        oasysStartedDate: undefined,
        oasysCompletedDate: undefined,
        value: {
          overallRisk: manualData.overallRisk,
          riskToChildren: manualData.riskToChildren,
          riskToKnownAdult: manualData.riskToKnownAdult,
          riskToPublic: manualData.riskToPublic,
          riskToStaff: manualData.riskToStaff,
        },
        status: 'manual', // use method
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

  private isManualDataAvailable(application: Application) {
    return !!application.data['risk-of-serious-harm']?.['manual-rosh-information']
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
    if (this.isSummaryDataRetrieved(this.application) || this.isManualDataAvailable(this.application)) {
      const riskData = this.risks
      console.log('in response')

      // have an overall format that can be used for response
      response = {
        'Overall risk rating': riskData.value.overallRisk,
        'Risk to children': riskData.value.riskToChildren,
        'Risk to known adult': riskData.value.riskToKnownAdult,
        'Risk to public': riskData.value.riskToPublic,
        'Risk to staff': riskData.value.riskToStaff,
      }

      // depending on the source for rik data, append extra fields

      if (riskData.oasysImportedDate) {
        this.importDate = DateFormats.dateObjtoUIDate(riskData.oasysImportedDate, {
          format: 'medium',
        })
      }
    }

    // if (this.body.additionalComments) {
    //   response[this.questions.additionalComments] = this.body.additionalComments
    // }

    return response
  }
}
