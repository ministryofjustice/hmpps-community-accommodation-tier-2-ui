import type { TaskListErrors } from '@approved-premises/ui'
import type { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'

import TaskListPage from '../../../taskListPage'

type CheckYourAnswersBody = {
  checkYourAnswers?: string
}

@Page({ name: 'check-your-answers', bodyProperties: ['checkYourAnswers'] })
export default class CheckYourAnswers implements TaskListPage {
  documentTitle = 'Check your answers'

  title = 'Check your answers'

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

  errors() {
    const errors: TaskListErrors<this> = {}

    if (this.body?.checkYourAnswers !== 'confirmed') {
      errors.checkYourAnswers =
        'You must confirm the information provided is accurate and, where required, it has been verified by all relevant prison departments.'
    }

    return errors
  }
}
