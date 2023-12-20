import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

type InformationNeededBody = {
  hasInformationNeeded: YesOrNo
}
@Page({
  name: 'information-needed-from-applicant',
  bodyProperties: ['hasInformationNeeded'],
})
export default class InformationNeeded implements TaskListPage {
  documentTitle = 'Check information needed from the applicant'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Check information needed from ${this.personName}`

  questions: Record<string, string>

  options: Record<string, string>

  body: InformationNeededBody

  constructor(
    body: Partial<InformationNeededBody>,
    private readonly application: Application,
  ) {
    this.body = body as InformationNeededBody

    const applicationQuestions = getQuestions(this.personName)
    this.questions = {
      hasInformationNeeded:
        applicationQuestions['information-needed-from-applicant']['information-needed-from-applicant']
          .hasInformationNeeded.question,
    }
    this.options =
      applicationQuestions['information-needed-from-applicant'][
        'information-needed-from-applicant'
      ].hasInformationNeeded.answers
  }

  previous() {
    return 'taskList'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.hasInformationNeeded) {
      errors.hasInformationNeeded = 'Confirm whether you have all the information you need from the applicant'
    }
    return errors
  }

  items() {
    return convertKeyValuePairToRadioItems(this.options, this.body.hasInformationNeeded)
  }
}
