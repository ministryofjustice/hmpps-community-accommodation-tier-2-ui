import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application, RoshRisksEnvelope } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { DateFormats } from '../../../../utils/dateUtils'
import { getRiskDataCreatedDate, getRiskDetails, getRiskDataSource } from '../../../utils'
import { getQuestions } from '../../../utils/questions'

export type SummaryBody = {
  additionalComments?: string
}

export type SummaryData = RoshRisksEnvelope & {
  oasysImportedDate: Date
  oasysStartedDate: string
  oasysCompletedDate?: string
  method?: string
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

  risks?: SummaryData

  questions: {
    additionalComments: string
  }

  riskCDataCreatedDate = getRiskDataCreatedDate(this.application, 'risk-of-serious-harm', 'OASys')

  constructor(
    body: Partial<SummaryBody>,
    private readonly application: Application,
  ) {
    this.body = body as SummaryBody
    this.application = application

    const riskData = getRiskDataSource(this.application)

    if (riskData) {
      this.risks = {
        ...riskData,
        value:
          riskData.value && Object.keys(riskData.value).length > 0
            ? {
                overallRisk: getRiskDetails(riskData.value?.overallRisk ?? ''),
                riskToChildren: getRiskDetails(riskData.value?.riskToChildren ?? ''),
                riskToPublic: getRiskDetails(riskData.value?.riskToPublic ?? ''),
                riskToKnownAdult: getRiskDetails(riskData.value?.riskToKnownAdult ?? ''),
                riskToStaff: getRiskDetails(riskData.value?.riskToStaff ?? ''),
              }
            : undefined,
      }
    }

    const roshQuestions = getQuestions(this.personName)['risk-of-serious-harm']
    this.questions = {
      additionalComments: roshQuestions.summary.additionalComments.question,
    }
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
    let response: Record<string, string | undefined> = {}

    if (this.risks) {
      response = {
        'OASys created': DateFormats.isoDateToUIDate(this.risks.oasysStartedDate, { format: 'medium' }),
        'OASys completed': this.risks.oasysCompletedDate
          ? DateFormats.isoDateToUIDate(this.risks.oasysCompletedDate, { format: 'medium' })
          : 'Unknown',
        'OASys imported': DateFormats.dateObjtoUIDate(this.risks.oasysImportedDate, { format: 'medium' }),
        'Overall risk rating': this.risks.value.overallRisk,
        'Risk to children': this.risks.value.riskToChildren,
        'Risk to known adult': this.risks.value.riskToKnownAdult,
        'Risk to public': this.risks.value.riskToPublic,
        'Risk to staff': this.risks.value.riskToStaff,
      }
    }

    if (this.body.additionalComments) {
      response['Additional comments (optional)'] = this.body.additionalComments
    }

    return response
  }
}
