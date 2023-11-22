import { Cas2Application as Application } from '@approved-premises/api'
import { TaskListErrors } from '@approved-premises/ui'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

type FirstPreferredAreaBody = {
  preferredArea: string
  preferenceReason: string
}

@Page({
  name: 'first-preferred-area',
  bodyProperties: ['preferredArea', 'preferenceReason'],
})
export default class FirstPreferredArea implements TaskListPage {
  documentTitle = 'First preferred area for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `First preferred area for ${nameOrPlaceholderCopy(this.application.person)}`

  questions = getQuestions(this.personName)['area-information']['first-preferred-area']

  body: FirstPreferredAreaBody

  constructor(
    body: Partial<FirstPreferredAreaBody>,
    private readonly application: Application,
  ) {
    this.body = body as FirstPreferredAreaBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'second-preferred-area'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.preferredArea) {
      errors.preferredArea = 'Provide a town, city or region for the first preferred area'
    }

    if (!this.body.preferenceReason) {
      errors.preferenceReason = "Provide the reason for the applicant's first preferred area"
    }

    return errors
  }
}
