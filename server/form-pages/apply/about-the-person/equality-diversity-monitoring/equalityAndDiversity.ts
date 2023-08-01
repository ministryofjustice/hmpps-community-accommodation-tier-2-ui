import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'

type EqualityAndDiversityBody = {
  willAnswer: YesOrNo
}

export const options = {
  yes: 'Yes, answer the equality questions (takes 2 minutes)',
  no: 'No, skip the equality questions',
}

@Page({
  name: 'will-answer-equality-questions',
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
    if (this.body.willAnswer === 'no') {
      return ''
    }
    return 'disability'
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
      [this.questions.willAnswer]: options[this.body.willAnswer],
    }

    return response
  }

  items() {
    return convertKeyValuePairToRadioItems(options, this.body.willAnswer)
  }
}
