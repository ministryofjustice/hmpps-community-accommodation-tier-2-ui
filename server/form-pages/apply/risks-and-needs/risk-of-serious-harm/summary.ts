import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application, RoshRisks, RoshRisksEnvelope } from '@approved-premises/api'
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
  oasysImportedDate?: Date
  oasysStartedDate?: string
  oasysCompletedDate?: string
  method?: string
}

interface Column {
  text: string
}
interface Row {
  text: string
  classes?: string
}

interface RiskWidgetData {
  overallRisk: {
    text: string
    classes: string
  }
  head: Column[]
  rows: Row[][]
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

  riskWidgetData: RiskWidgetData

  questions: {
    additionalComments: string
  }

  riskDataCreatedDate = getRiskDataCreatedDate(this.application, 'risk-of-serious-harm', 'OASys')

  constructor(
    body: Partial<SummaryBody>,
    private readonly application: Application,
  ) {
    this.body = body as SummaryBody
    this.application = application

    const riskData = getRiskDataSource(this.application)

    if (riskData) {
      this.riskWidgetData = this.getRiskWidgetData(riskData)

      this.risks = {
        ...riskData,
        value: this.getRiskValues(riskData),
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

  getRiskWidgetData(riskData: Pick<RoshRisksEnvelope, 'value'>): RiskWidgetData {
    if (riskData.value) {
      return {
        overallRisk: {
          text: riskData.value.overallRisk.toUpperCase(),
          classes: `rosh-widget--${riskData.value.overallRisk.toLowerCase().replace(/ /g, '-')}`,
        },
        head: [
          {
            text: 'Risk to',
          },
          {
            text: 'Community',
          },
        ],
        rows: [
          [
            {
              text: 'Children',
            },
            {
              text: riskData.value.riskToChildren,
              classes: `rosh-widget__risk--${riskData.value.riskToChildren.toLowerCase().replace(/ /g, '-')}`,
            },
          ],
          [
            {
              text: 'Public',
            },
            {
              text: riskData.value.riskToPublic,
              classes: `rosh-widget__risk--${riskData.value.riskToPublic.toLowerCase().replace(/ /g, '-')}`,
            },
          ],
          [
            {
              text: 'Known adult',
            },
            {
              text: riskData.value.riskToKnownAdult,
              classes: `rosh-widget__risk--${riskData.value.riskToKnownAdult.toLowerCase().replace(/ /g, '-')}`,
            },
          ],
          [
            {
              text: 'Staff',
            },
            {
              text: riskData.value.riskToStaff,
              classes: `rosh-widget__risk--${riskData.value.riskToStaff.toLowerCase().replace(/ /g, '-')}`,
            },
          ],
        ],
      }
    }
    return undefined
  }

  getRiskValues(riskData: SummaryData | RoshRisks | never) {
    // Function to extract risk details from a risk object
    const getRiskValue = (data: RoshRisks | SummaryData, key: keyof RoshRisks | keyof SummaryData) => {
      return getRiskDetails((data as any)?.value?.[key] ?? (data as any)[key] ?? '')
    }

    // If riskData is SummaryData with a 'value' property
    if ('value' in riskData && riskData.value && Object.keys(riskData.value).length > 0) {
      return {
        overallRisk: getRiskValue(riskData, 'overallRisk'),
        riskToChildren: getRiskValue(riskData, 'riskToChildren'),
        riskToPublic: getRiskValue(riskData, 'riskToPublic'),
        riskToKnownAdult: getRiskValue(riskData, 'riskToKnownAdult'),
        riskToStaff: getRiskValue(riskData, 'riskToStaff'),
      }
    }

    // If riskData is RoshRisks or contains keys
    if (Object.keys(riskData).length > 0) {
      return {
        overallRisk: getRiskValue(riskData, 'overallRisk'),
        riskToChildren: getRiskValue(riskData, 'riskToChildren'),
        riskToPublic: getRiskValue(riskData, 'riskToPublic'),
        riskToKnownAdult: getRiskValue(riskData, 'riskToKnownAdult'),
        riskToStaff: getRiskValue(riskData, 'riskToStaff'),
      }
    }

    return undefined
  }
}
