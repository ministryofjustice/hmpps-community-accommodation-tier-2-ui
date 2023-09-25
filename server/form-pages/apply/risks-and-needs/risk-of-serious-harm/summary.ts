import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application, RiskEnvelopeStatus, RoshRisks } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { DateFormats } from '../../../../utils/dateUtils'
import { getOasysImportDateFromApplication } from '../../../utils'

type SummaryBody = RoshRisks & {
  status: RiskEnvelopeStatus
  oasysImportDate: string
  additionalComments?: string
}

@Page({
  name: 'summary',
  bodyProperties: [
    'status',
    'overallRisk',
    'riskToChildren',
    'riskToPublic',
    'riskToKnownAdult',
    'riskToStaff',
    'lastUpdated',
    'additionalComments',
  ],
})
export default class Summary implements TaskListPage {
  documentTitle = 'Risk of serious harm (RoSH) summary for the person'

  title = `Risk of serious harm (RoSH) summary for ${nameOrPlaceholderCopy(this.application.person)}`

  body: SummaryBody

  risks: Record<string, string> = {}

  questions = { additionalComments: 'Additional comments (optional)' }

  importDate = getOasysImportDateFromApplication(this.application, 'risk-of-serious-harm')

  constructor(
    body: Partial<SummaryBody>,
    private readonly application: Application,
  ) {
    this.body = body as SummaryBody
    if (this.body.status === 'retrieved') {
      this.risks = {
        ...this.body,
        lastUpdated: this.body.lastUpdated
          ? DateFormats.isoDateToUIDate(this.body.lastUpdated, { format: 'medium' })
          : null,
      }
    }
  }

  previous() {
    return 'oasys-import'
  }

  next() {
    return 'risk-to-others'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }

  response() {
    if (this.body.additionalComments) {
      const { additionalComments, ...response } = this.body
      return { ...response, [this.questions.additionalComments]: this.body.additionalComments }
    }
    return this.body
  }
}
