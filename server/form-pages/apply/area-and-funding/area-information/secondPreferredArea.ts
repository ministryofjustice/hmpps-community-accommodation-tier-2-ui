import { Cas2Application as Application } from '@approved-premises/api'
import { TaskListErrors } from '@approved-premises/ui'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

type SecondPreferredAreaBody = {
  preferredArea: string
  preferenceReason: string
}

@Page({
  name: 'second-preferred-area',
  bodyProperties: ['preferredArea', 'preferenceReason'],
})
export default class SecondPreferredArea implements TaskListPage {
  documentTitle = 'Second preferred area for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Second preferred area for ${nameOrPlaceholderCopy(this.application.person)}`

  questions = getQuestions(this.personName)['area-information']['second-preferred-area']

  body: SecondPreferredAreaBody

  constructor(
    body: Partial<SecondPreferredAreaBody>,
    private readonly application: Application,
  ) {
    this.body = body as SecondPreferredAreaBody
  }

  previous() {
    return 'first-preferred-area'
  }

  next() {
    return 'exclusion-zones'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.preferredArea) {
      errors.preferredArea = 'Provide a town, city or region for the second preferred area'
    }

    if (!this.body.preferenceReason) {
      errors.preferenceReason = "Provide the reason for the applicant's second preferred area"
    }

    return errors
  }
}
