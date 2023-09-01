import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type AcctBody = {
  acctData: { acctDetail: string }[]
}

@Page({
  name: 'acct-data',
  bodyProperties: ['acctData'],
})
export default class AcctData implements TaskListPage {
  title = 'Add an ACCT entry'

  body: AcctBody

  questions = {
    acctDetail: {
      question: 'Details about the ACCT',
    },
  }

  existingAccts: { acctDetail: string }[]

  constructor(
    body: Partial<AcctBody>,
    private readonly application: Application,
  ) {
    console.log('constructor', application.data['risk-to-self'])
    console.log('body in page', body)
    let existingAccts
    if (application.data['risk-to-self']['acct-data']) {
      existingAccts = application.data['risk-to-self']['acct-data'].acctData
      console.log('existing accts', existingAccts)
    }
    this.existingAccts = existingAccts
    this.body = body as AcctBody
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
