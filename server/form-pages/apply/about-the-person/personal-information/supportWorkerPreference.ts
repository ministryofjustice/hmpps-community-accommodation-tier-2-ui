import { Cas2Application as Application } from '@approved-premises/api'
import { TaskListErrors, YesNoOrDontKnow } from '@approved-premises/ui'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type SupportWorkerPreferenceBody = {
  hasSupportWorkerPreference: YesNoOrDontKnow
  supportWorkerPreference: 'male' | 'female'
}

@Page({
  name: 'support-worker-preference',
  bodyProperties: ['hasSupportWorkerPreference', 'supportWorkerPreference'],
})
export default class SupportWorkerPreference implements TaskListPage {
  documentTitle = 'Does the person have a gender preference for their support worker?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Does ${this.personName} have a gender preference for their support worker?`

  questions = getQuestions(this.personName)['personal-information']['support-worker-preference']

  body: SupportWorkerPreferenceBody

  constructor(
    body: Partial<SupportWorkerPreferenceBody>,
    private readonly application: Application,
  ) {
    this.body = body as SupportWorkerPreferenceBody
  }

  previous() {
    return 'pregnancy-information'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasSupportWorkerPreference) {
      errors.hasSupportWorkerPreference = `Choose either Yes, No or I don't know`
    }

    if (this.body.hasSupportWorkerPreference === 'yes' && !this.body.supportWorkerPreference) {
      errors.supportWorkerPreference = 'Choose either Male or Female'
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasSupportWorkerPreference !== 'yes') {
      delete this.body.supportWorkerPreference
    }
  }
}
