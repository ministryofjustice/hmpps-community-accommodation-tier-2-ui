import type { TaskListErrors } from '@approved-premises/ui'
import type { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import { isFullPerson } from '../../../../utils/utils'

import TaskListPage from '../../../taskListPage'

type CheckYourAnswersBody = {
  checkYourAnswers?: string
}

type ApplicationSummary = {
  id: string
  name?: string
  prisonNumber?: string
  prisonName?: string
  referrerName: string
  contactEmail?: string
  view: string
}

@Page({ name: 'check-your-answers', bodyProperties: ['checkYourAnswers'] })
export default class CheckYourAnswers implements TaskListPage {
  documentTitle = 'Check your answers before sending your application'

  title = 'Check your answers before sending your application'

  constructor(
    public body: Partial<CheckYourAnswersBody>,
    readonly application: Application,
  ) {}

  previous() {
    return 'dashboard'
  }

  next() {
    return ''
  }

  applicationSummary(): ApplicationSummary {
    return {
      id: this.application.id,
      name: isFullPerson(this.application.person) ? this.application.person.name : null,
      prisonNumber: isFullPerson(this.application.person) ? this.application.person.nomsNumber : null,
      prisonName: isFullPerson(this.application.person) ? this.application.person.prisonName : null,
      referrerName: this.application.createdBy.name,
      contactEmail: this.application.createdBy.email,
      view: 'checkYourAnswers',
    }
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (this.body?.checkYourAnswers !== 'confirmed') {
      errors.checkYourAnswers =
        'You must confirm the information provided is accurate and, where required, it has been verified by all relevant prison departments.'
    }

    return errors
  }
}
