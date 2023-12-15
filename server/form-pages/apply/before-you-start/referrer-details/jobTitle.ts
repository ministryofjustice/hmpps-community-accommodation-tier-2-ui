import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

type JobTitleBody = {
  jobTitle: string
}

@Page({
  name: 'job-title',
  bodyProperties: ['jobTitle'],
})
export default class JobTitle implements TaskListPage {
  documentTitle: string

  personName = nameOrPlaceholderCopy(this.application.person)

  title: string

  questions

  body: JobTitleBody

  constructor(
    body: Partial<JobTitleBody>,
    private readonly application: Application,
  ) {
    this.body = body as JobTitleBody

    const applicationQuestions = getQuestions(this.personName)
    this.questions = applicationQuestions['referrer-details']['job-title']
    this.documentTitle = this.questions.jobTitle.question
    this.title = this.questions.jobTitle.question
  }

  previous() {
    return 'confirm-details'
  }

  next() {
    return 'contact-number'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.jobTitle) {
      errors.jobTitle = 'Enter your job title'
    }

    return errors
  }
}
