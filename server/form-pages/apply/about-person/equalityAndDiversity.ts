import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../utils/decorators'
import TaskListPage from '../../taskListPage'

type EqualityAndDiversityBody = {
  willAnswer: YesOrNo
}

@Page({
  name: 'will-answer',
  bodyProperties: ['willAnswer'],
})
export default class EqualityAndDiversity implements TaskListPage {
  title = `Equality and diversity questions for ${this.application.person.name}`

  questions = {
    willAnswer: `Does ${this.application.person.name} want to answer the equality questions?`,
  }

  body: EqualityAndDiversityBody

  constructor(
    body: Partial<EqualityAndDiversityBody>,
    private readonly application: Application,
  ) {
    this.body = body as EqualityAndDiversityBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.willAnswer) {
      errors.willAnswer = 'Choose either Yes or No'
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.willAnswer]: this.body.willAnswer,
    }

    return response
  }
}
