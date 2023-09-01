import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type AcctBody = {
  acctDetail: string
}

@Page({
  name: 'acct-data',
  bodyProperties: ['acctDetail'],
})
export default class AcctData implements TaskListPage {
  title = 'Add an ACCT entry'

  body: AcctBody

  questions = {
    acctDetail: {
      question: 'Details about the ACCT',
    },
  }

  taskData: string

  taskName = 'risk-to-self'

  constructor(
    body: Partial<AcctBody>,
    private readonly application: Application,
    taskData: string,
  ) {
    console.log('constructor', application.data['risk-to-self'])
    console.log('body in page', body)
    this.taskData = taskData
    this.body = body as AcctBody
  }

  static async initialize(
    body: Partial<AcctBody>,
    application: Cas2Application,
    token: string,
    dataServices: DataServices,
  ) {
    let oasys
    let taskDataJson

    if (!application.data['risk-to-self']) {
      try {
        oasys = await dataServices.personService.getOasysRiskToSelf(token, application.person.crn)

        taskDataJson = JSON.stringify(RiskToSelfGuidance.getTaskData(oasys))
      } catch (e) {
        if (e.status === 404) {
          oasys = null
        } else {
          throw e
        }
      }
      return new RiskToSelfGuidance(body, application, oasys, taskDataJson)
    }
    return new Vulnerability(application.data['risk-to-self'].vulnerability, application)
  }

  previous() {
    return 'acct'
  }

  next() {
    return 'acct'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }

  response() {
    console.log(this.application.data['risk-to-self']['acct-data']?.acctData)
    const response = {
      // acctData: [
      //   {
      //     [this.questions.acctDetail.question]: this.body.acctDetail,
      //   },
      // ],
    }

    return response
  }
}
