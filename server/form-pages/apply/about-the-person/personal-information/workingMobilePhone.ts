import { Cas2Application as Application } from '@approved-premises/api'
import { TaskListErrors, YesNoOrDontKnow, YesOrNo } from '@approved-premises/ui'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type WorkingMobilePhoneBody = {
  hasWorkingMobilePhone: YesNoOrDontKnow
  mobilePhoneNumber: string
  isSmartPhone: YesOrNo
}

@Page({
  name: 'working-mobile-phone',
  bodyProperties: ['hasWorkingMobilePhone', 'mobilePhoneNumber', 'isSmartPhone'],
})
export default class WorkingMobilePhone implements TaskListPage {
  documentTitle = 'Will the person have a working mobile phone when they are released?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Will ${nameOrPlaceholderCopy(this.application.person)} have a working mobile phone when they are released?`

  questions = getQuestions(this.personName)['personal-information']['working-mobile-phone']

  body: WorkingMobilePhoneBody

  constructor(
    body: Partial<WorkingMobilePhoneBody>,
    private readonly application: Application,
  ) {
    this.body = body as WorkingMobilePhoneBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'immigration-status'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasWorkingMobilePhone) {
      errors.hasWorkingMobilePhone = `Choose either Yes, No or I don't know`
    }

    if (this.body.hasWorkingMobilePhone === 'yes' && !this.body.isSmartPhone) {
      errors.isSmartPhone = 'Choose either Yes or No'
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasWorkingMobilePhone !== 'yes') {
      delete this.body.mobilePhoneNumber
      delete this.body.isSmartPhone
    }
  }
}
