import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { AcctDataBody } from './acctData'
import { DateFormats } from '../../../../utils/dateUtils'

type AcctBody = Record<string, never>

type AcctUI = { referringInstitution: string; expiryDate: string; createdDate: string; acctDetails: string }

@Page({
  name: 'acct',
  bodyProperties: ['acctDetail'],
})
export default class Acct implements TaskListPage {
  title = 'Assessment, Care in Custody and Teamwork (ACCT)'

  body: AcctBody

  accts: AcctUI[]

  constructor(
    body: Partial<AcctBody>,
    private readonly application: Application,
  ) {
    if (application.data['risk-to-self']['acct-data']) {
      const acctData = application.data['risk-to-self']['acct-data'] as AcctDataBody

      this.accts = acctData.acctData.map(acct => {
        return {
          referringInstitution: acct.referringInstitution,
          createdDate: this.convertArrayToUIdate(acct.createdDate),
          expiryDate: this.convertArrayToUIdate(acct.expiryDate),
          acctDetails: acct.acctDetails,
        }
      })
    }
    this.body = body as AcctBody
  }

  convertArrayToUIdate(dateArray: string[]) {
    const year = dateArray[2]
    const month = `0${dateArray[1]}`.slice(-2)
    const day = `0${dateArray[0]}`.slice(-2)
    return DateFormats.isoDateToUIDate(`${year}-${month}-${day}`, { format: 'short' })
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
