import { Cas2Application as Application } from '@approved-premises/api'
import { TaskListErrors } from '@approved-premises/ui'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type ImmigrationStatusBody = {
  immigrationStatus: string
}

@Page({
  name: 'immigration-status',
  bodyProperties: ['immigrationStatus'],
})
export default class ImmigrationStatus implements TaskListPage {
  documentTitle = "What is the person's immigration status?"

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `What is ${nameOrPlaceholderCopy(this.application.person)}'s immigration status?`

  questions = getQuestions(this.personName)['personal-information']['immigration-status']

  body: ImmigrationStatusBody

  constructor(
    body: Partial<ImmigrationStatusBody>,
    private readonly application: Application,
  ) {
    this.body = body as ImmigrationStatusBody
  }

  previous() {
    return 'working-mobile-phone'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.immigrationStatus) {
      errors.immigrationStatus = 'Enter the immigration status'
    }

    return errors
  }
}
