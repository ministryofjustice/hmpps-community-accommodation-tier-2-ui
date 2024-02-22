import { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'

type AnyPreviousConvictionsBody = {
  hasAnyPreviousConvictions: YesOrNo
}

@Page({
  name: 'any-previous-convictions',
  bodyProperties: ['hasAnyPreviousConvictions'],
})
export default class AnyPreviousConvictions implements TaskListPage {
  documentTitle = 'Does the person have any previous unspent convictions?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Does ${this.personName} have any previous unspent convictions?`

  questions = getQuestions(this.personName)['offending-history']['any-previous-convictions']

  options: Record<string, string>

  body: AnyPreviousConvictionsBody

  constructor(
    body: Partial<AnyPreviousConvictionsBody>,
    private readonly application: Application,
  ) {
    this.body = body as AnyPreviousConvictionsBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    if (this.body.hasAnyPreviousConvictions === 'yes') {
      if (this.application.data['offending-history']?.['offence-history-data']?.length > 0) {
        return 'offence-history'
      }
      return 'offence-history-data'
    }
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.hasAnyPreviousConvictions) {
      errors.hasAnyPreviousConvictions = 'Confirm whether the applicant has any previous unspent convictions'
    }
    return errors
  }

  items() {
    return convertKeyValuePairToRadioItems(
      this.questions.hasAnyPreviousConvictions.answers,
      this.body.hasAnyPreviousConvictions,
    )
  }
}
