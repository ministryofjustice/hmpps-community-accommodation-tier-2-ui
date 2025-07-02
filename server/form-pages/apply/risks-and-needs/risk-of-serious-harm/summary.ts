import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application, RoshRisks, RoshRisksEnvelope } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { DateFormats } from '../../../../utils/dateUtils'
import { getQuestions } from '../../../utils/questions'

export type SummaryBody = {
  additionalComments?: string
}

export type SummaryData = RoshRisksEnvelope & {
  oasysImportedDate?: Date
  oasysStartedDate?: string
  oasysCompletedDate?: string
}

type OASysSummaryData = SummaryData

export type ManualRoshData = RoshRisks & {
  createdAt?: Date
}

interface Column {
  text: string
}
interface Row {
  text: string
  classes?: string
}

interface RiskWidgetData {
  widget: {
    classes: string
  }
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

  riskData: OASysSummaryData | ManualRoshData

  riskWidgetData: RiskWidgetData

  questions: {
    additionalComments: string
  }

  auditInfo: string

  constructor(
    body: Partial<SummaryBody>,
    private readonly application: Cas2Application,
  ) {
    this.body = body as SummaryBody
    this.application = application

    // Get All RoSH Data if it exists else returns undefined
    const roshData = this.getRoSHData(this.application)

    if (roshData) {
      this.riskData = this.getRiskDataSource(roshData)

      this.auditInfo = this.getAuditInfo(this.riskData)

      if (this.riskData) {
        this.riskWidgetData = this.getRiskWidgetData(this.riskData)
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

    const formatDate = (date: string | undefined, format: 'short' | 'long' | 'medium') => {
      return date ? DateFormats.isoDateToUIDate(date, { format }) : 'Unknown'
    }

    if (this.riskData) {
      const isOasysData = (this.riskData as OASysSummaryData).value !== undefined

      const commonData = {
        'Overall risk rating': 'overallRisk',
        'Risk to children': 'riskToChildren',
        'Risk to known adult': 'riskToKnownAdult',
        'Risk to public': 'riskToPublic',
        'Risk to staff': 'riskToStaff',
      }

      if (isOasysData) {
        const oasysData = this.riskData as OASysSummaryData
        response = {
          'OASys created': formatDate(oasysData.oasysStartedDate, 'medium'),
          'OASys completed': oasysData.oasysCompletedDate
            ? formatDate(oasysData.oasysCompletedDate, 'medium')
            : 'Unknown',
          'OASys imported': DateFormats.dateObjtoUIDate(oasysData.oasysImportedDate, { format: 'medium' }),
          ...Object.fromEntries(Object.entries(commonData).map(([label, key]) => [label, oasysData.value[key]])),
        }
      } else {
        const manualData = this.riskData as ManualRoshData
        response = {
          'Created by prison offender manager': DateFormats.dateObjtoUIDate(manualData.createdAt, { format: 'medium' }),
          ...Object.fromEntries(Object.entries(commonData).map(([label, key]) => [label, manualData[key]])),
        }
      }
    }

    if (this.body.additionalComments) {
      response['Additional comments (optional)'] = this.body.additionalComments
    }

    return response
  }

  getRiskWidgetData(riskData: Pick<RoshRisksEnvelope, 'value'>): RiskWidgetData {
    const source = (riskData.value || riskData) as RoshRisks

    if (source) {
      return {
        widget: {
          classes: `rosh-widget--${source.overallRisk?.toLowerCase().replace(/ /g, '-')}`,
        },
        overallRisk: {
          text: source.overallRisk?.toUpperCase(),
          classes: `rosh-widget__risk--${source.riskToChildren?.toLowerCase().replace(/ /g, '-')}`,
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
              text: source.riskToChildren || 'No Data',
              classes: `rosh-widget__risk--${source.riskToChildren?.toLowerCase().replace(/ /g, '-')}`,
            },
          ],
          [
            {
              text: 'Public',
            },
            {
              text: source.riskToPublic || 'No Data',
              classes: `rosh-widget__risk--${source.riskToPublic?.toLowerCase().replace(/ /g, '-')}`,
            },
          ],
          [
            {
              text: 'Known adult',
            },
            {
              text: source.riskToKnownAdult || 'No Data',
              classes: `rosh-widget__risk--${source.riskToKnownAdult?.toLowerCase().replace(/ /g, '-')}`,
            },
          ],
          [
            {
              text: 'Staff',
            },
            {
              text: source.riskToStaff || 'No Data',
              classes: `rosh-widget__risk--${source.riskToStaff?.toLowerCase().replace(/ /g, '-')}`,
            },
          ],
        ],
      }
    }
    return undefined
  }

  private getRoSHData(application: Cas2Application) {
    return application.data['risk-of-serious-harm']
  }

  private getRiskDataSource(roshData: unknown): SummaryData | null {
    const riskData = roshData

    if (riskData['summary-data']?.status === 'retrieved') {
      return riskData['summary-data']
    }

    if (riskData['manual-rosh-information']) {
      return riskData['manual-rosh-information']
    }
    return undefined
  }

  private getAuditInfo(roshData: unknown): string | never {
    if ((roshData as OASysSummaryData)?.oasysImportedDate) {
      return `Imported from OASys on <strong>${DateFormats.dateObjtoUIDate(
        (roshData as OASysSummaryData).oasysImportedDate,
        { format: 'medium' },
      )}</strong>`
    }

    if ((roshData as ManualRoshData)?.createdAt) {
      return `Created by prison offender manager on <strong>${DateFormats.dateObjtoUIDate(
        (roshData as ManualRoshData).createdAt,
        {
          format: 'medium',
        },
      )}</strong>`
    }

    return undefined
  }
}
