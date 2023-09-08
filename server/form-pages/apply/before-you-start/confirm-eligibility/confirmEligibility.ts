import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type ConfirmEligibilityBody = {
  isEligible: YesOrNo
}
@Page({
  name: 'confirm-eligibility',
  bodyProperties: ['isEligible'],
})
export default class ConfirmEligibility implements TaskListPage {
  documentTitle = 'Check the person is eligible for Short-Term Accommodation (CAS-2)'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Check ${this.personName} is eligible for Short-Term Accommodation (CAS-2)`

  questions = {
    isEligible: `Is ${this.personName} eligible for Short-Term Accommodation (CAS-2)?`,
  }

  options = {
    yes: `Yes, I confirm ${this.personName} is eligible`,
    no: `No, ${this.personName} is not eligible`,
  }

  body: ConfirmEligibilityBody

  constructor(
    body: Partial<ConfirmEligibilityBody>,
    private readonly application: Application,
  ) {
    this.body = body as ConfirmEligibilityBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.isEligible) {
      errors.isEligible = 'Confirm whether the applicant is eligible or not eligible'
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.isEligible]: this.options[this.body.isEligible],
    }

    return response
  }

  items() {
    return convertKeyValuePairToRadioItems(this.options, this.body.isEligible)
  }
}
