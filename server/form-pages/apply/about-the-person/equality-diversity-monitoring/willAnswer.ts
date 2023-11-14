import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

type EqualityAndDiversityBody = {
  willAnswer: YesOrNo
}

@Page({
  name: 'will-answer-equality-questions',
  bodyProperties: ['willAnswer'],
})
export default class EqualityAndDiversity implements TaskListPage {
  documentTitle = 'Equality questions'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Equality questions for ${this.personName}`

  questions: Record<string, string>

  body: EqualityAndDiversityBody

  options: Record<string, string>

  constructor(
    body: Partial<EqualityAndDiversityBody>,
    private readonly application: Application,
  ) {
    this.body = body as EqualityAndDiversityBody
    const applicationQuestions = getQuestions(this.personName)
    this.questions = {
      willAnswer:
        applicationQuestions['equality-and-diversity-monitoring']['will-answer-equality-questions'].willAnswer.question,
    }
    this.options =
      applicationQuestions['equality-and-diversity-monitoring']['will-answer-equality-questions'].willAnswer.answers
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

  items() {
    return convertKeyValuePairToRadioItems(this.options, this.body.willAnswer)
  }
}
