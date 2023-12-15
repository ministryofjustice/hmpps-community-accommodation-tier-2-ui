import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

type ConfirmReferrerDetailsBody = {
  name: string
  email: string
}

@Page({
  name: 'confirm-details',
  bodyProperties: ['name', 'email'],
})
export default class ConfirmReferrerDetails implements TaskListPage {
  documentTitle = 'Confirm your details'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Confirm your details`

  questions

  body: ConfirmReferrerDetailsBody

  referrerDetails: ConfirmReferrerDetailsBody

  constructor(
    body: Partial<ConfirmReferrerDetailsBody>,
    private readonly application: Application,
  ) {
    this.referrerDetails = { name: application.createdBy.name, email: application.createdBy.email }

    const applicationQuestions = getQuestions(this.personName)
    this.questions = applicationQuestions['referrer-details']['confirm-details']
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'job-title'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }
}
