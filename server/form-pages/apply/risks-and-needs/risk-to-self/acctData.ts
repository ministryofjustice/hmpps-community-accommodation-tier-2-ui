import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { DateFormats, InvalidDateStringError } from '../../../../utils/dateUtils'

export type AcctDataBody = {
  acctData: {
    referringInstitution: string
    createdDate: string[]
    expiryDate: string[]
    acctDetails: string
  }[]
}

@Page({
  name: 'acct-data',
  bodyProperties: ['acctData'],
})
export default class AcctData implements TaskListPage {
  title = 'Add an ACCT entry'

  body: AcctDataBody

  questions = {
    createdDate: {
      question: 'When was the ACCT created?',
    },
    expiryDate: {
      question: 'When did the ACCT expire?',
    },
    referringInstitution: {
      question: 'Referring institution',
      hint: 'Where the applicant was based at the time the ACCT was created',
    },
    acctDetail: {
      question: 'Details about the ACCT',
    },
  }

  existingAccts: { acctDetail: string }[]

  constructor(
    body: Partial<AcctDataBody>,
    private readonly application: Application,
  ) {
    let existingAccts
    if (application.data['risk-to-self'] && application.data['risk-to-self']['acct-data']) {
      existingAccts = application.data['risk-to-self']['acct-data'].acctData
    }
    this.existingAccts = existingAccts
    this.body = body as AcctDataBody
  }

  previous() {
    return 'acct'
  }

  next() {
    return 'acct'
  }

  dateIsValid(dateArray: string[]): boolean {
    try {
      DateFormats.convertArrayToUIdate(dateArray)
    } catch (err) {
      if (err instanceof InvalidDateStringError) {
        return false
      }
    }
    return true
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    const currentAcct = this.body.acctData[0]

    if (!this.dateIsValid(currentAcct.createdDate)) {
      errors['acctData[0][createdDate]'] = 'Add a valid created date, for example 2 3 2013'
    }
    if (!this.dateIsValid(currentAcct.expiryDate)) {
      errors['acctData[0][expiryDate]'] = 'Add a valid expiry date, for example 2 3 2013'
    }
    if (!currentAcct.referringInstitution) {
      errors['acctData[0][referringInstitution]'] = 'Add a referring institution'
    }
    if (!currentAcct.acctDetails) {
      errors['acctData[0][acctDetails]'] = 'Enter the details of the ACCT'
    }

    return errors
  }

  response() {
    const response = {}

    return response
  }
}
