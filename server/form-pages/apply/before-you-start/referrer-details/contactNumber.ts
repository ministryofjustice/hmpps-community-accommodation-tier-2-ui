import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

type ContactNumberBody = {
  telephone: string
}

@Page({
  name: 'contact-number',
  bodyProperties: ['telephone'],
})
export default class ContactNumber implements TaskListPage {
  documentTitle: string

  personName = nameOrPlaceholderCopy(this.application.person)

  title: string

  questions

  body: ContactNumberBody

  constructor(
    body: Partial<ContactNumberBody>,
    private readonly application: Application,
  ) {
    this.body = body as ContactNumberBody

    const applicationQuestions = getQuestions(this.personName)
    this.questions = applicationQuestions['referrer-details']['contact-number']
    this.documentTitle = this.questions.telephone.question
    this.title = this.questions.telephone.question
  }

  previous() {
    return 'job-title'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.telephone) {
      errors.telephone = 'Enter your contact telephone number'
    }

    return errors
  }
}
