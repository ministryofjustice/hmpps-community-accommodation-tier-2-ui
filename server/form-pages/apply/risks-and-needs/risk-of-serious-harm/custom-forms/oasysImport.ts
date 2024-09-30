import type { DataServices, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application, OASysRiskOfSeriousHarm, RoshRisksEnvelope } from '@approved-premises/api'
import { Page } from '../../../../utils/decorators'
import TaskListPage from '../../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../../utils/utils'
import { DateFormats } from '../../../../../utils/dateUtils'
import Summary, { SummaryData } from '../summary'
import { logOasysError } from '../../../../utils'
import OldOasys from '../oldOasys'

type OasysImportBody = Record<string, never>

export type RoshTaskData = {
  'risk-of-serious-harm': {
    'oasys-import': {
      oasysImportedDate: Date
    }
    summary: RoshRisksEnvelope & {
      oasysImportedDate: Date
    }
    'risk-to-others': {
      whoIsAtRisk: string
      natureOfRisk: string
    }
  }
}

@Page({
  name: 'oasys-import',
  bodyProperties: [],
})
export default class OasysImport implements TaskListPage {
  personName = nameOrPlaceholderCopy(this.application.person)

  documentTitle = "Import the person's risk of serious harm (RoSH) data from OASys"

  title = `Import ${nameOrPlaceholderCopy(this.application.person)}'s risk of serious harm (RoSH) data from OASys`

  body: OasysImportBody

  taskData: string

  hasOasysRecord: boolean

  oasysCompleted: string

  oasysStarted: string

  noOasysBannerText = `No OASys record available to import for ${this.personName}`

  noOasysDescriptiveText = `No information can be imported for the Risk of Serious Harm (RoSH) section because ${this.personName} 
                            does not have a Layer 3 OASys completed in the last 6 months.`

  taskName = 'risk-of-serious-harm'

  constructor(
    body: Partial<OasysImportBody>,
    private readonly application: Application,
    oasys: OASysRiskOfSeriousHarm,
    taskData: string,
  ) {
    this.body = body as OasysImportBody
    this.hasOasysRecord = (oasys && Boolean(Object.keys(oasys).length)) || false
    if (this.hasOasysRecord) {
      this.oasysStarted = oasys.dateStarted && DateFormats.isoDateToUIDate(oasys.dateStarted, { format: 'medium' })
      this.oasysCompleted =
        oasys.dateCompleted && DateFormats.isoDateToUIDate(oasys.dateCompleted, { format: 'medium' })
    }
    this.taskData = taskData
  }

  static async initialize(
    body: Partial<OasysImportBody>,
    application: Application,
    token: string,
    dataServices: DataServices,
  ) {
    let oasys: OASysRiskOfSeriousHarm
    let risks: RoshRisksEnvelope
    let taskDataJson

    if (!application.data['risk-of-serious-harm']) {
      try {
        oasys = await dataServices.personService.getOasysRosh(token, application.person.crn)
        risks = await dataServices.personService.getRoshRisks(token, application.person.crn)
        taskDataJson = JSON.stringify(OasysImport.getTaskData(oasys, risks))
      } catch (e) {
        logOasysError(e, application.person.crn)
        oasys = null
      }
      return new OasysImport(body, application, oasys, taskDataJson)
    }
    if (OasysImport.isRoshApplicationDataImportedFromOASys(application)) {
      return new Summary(application.data['risk-of-serious-harm'].summary ?? {}, application)
    }
    return new OldOasys(application.data['risk-of-serious-harm']['old-oasys'] ?? {}, application)
  }

  private static isRoshApplicationDataImportedFromOASys(application: Application): boolean {
    const rosh = application.data['risk-of-serious-harm']
    if (rosh?.['oasys-import']?.oasysImportedDate) {
      return true
    }
    return false
  }

  private static getTaskData(oasysSections: OASysRiskOfSeriousHarm, risks: RoshRisksEnvelope): Partial<RoshTaskData> {
    const taskData = { 'risk-of-serious-harm': { summary: {} } } as Partial<RoshTaskData>

    const today = new Date()

    taskData['risk-of-serious-harm']['summary-data'] = {
      ...risks,
      oasysImportedDate: today,
      oasysStartedDate: oasysSections.dateStarted,
      oasysCompletedDate: oasysSections.dateCompleted,
    } as SummaryData

    oasysSections.rosh.forEach(question => {
      switch (question.questionNumber) {
        case 'R10.1':
          taskData['risk-of-serious-harm']['risk-to-others'] = {
            ...taskData['risk-of-serious-harm']['risk-to-others'],
            whoIsAtRisk: question.answer,
          }
          break
        case 'R10.2':
          taskData['risk-of-serious-harm']['risk-to-others'] = {
            ...taskData['risk-of-serious-harm']['risk-to-others'],
            natureOfRisk: question.answer,
          }
          break
        default:
          break
      }
    })

    taskData['risk-of-serious-harm']['oasys-import'] = { oasysImportedDate: today }

    return taskData
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'summary'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }
}
