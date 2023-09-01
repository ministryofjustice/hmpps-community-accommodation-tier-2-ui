import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type AcctBody = Record<string, never>

@Page({
  name: 'acct',
  bodyProperties: ['acctDetail'],
})
export default class Acct implements TaskListPage {
  title = 'Assessment, Care in Custody and Teamwork (ACCT)'

  body: AcctBody

  constructor(
    body: Partial<AcctBody>,
    private readonly application: Application,
  ) {
    console.log(application.data['risk-to-self']['acct-data'])
    this.body = body as AcctBody
  }

  previous() {
    return 'historical-risk'
  }

  next() {
    return 'additional-information'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }

  response() {
    const response = {}

    return response
  }
}
