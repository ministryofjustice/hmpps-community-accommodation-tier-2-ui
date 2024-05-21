import type { ObjectWithDateParts, TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { dateBodyProperties } from '../../../utils'
import { getQuestions } from '../../../utils/questions'
import { DateFormats, dateAndTimeInputsAreValidDates, dateIsComplete } from '../../../../utils/dateUtils'

type OldOasysBody = {
  hasOldOasys: YesOrNo
} & ObjectWithDateParts<'oasysCompletedDate'>

@Page({
  name: 'old-oasys',
  bodyProperties: ['hasOldOasys', ...dateBodyProperties('oasysCompletedDate')],
})
export default class OldOasys implements TaskListPage {
  documentTitle = 'Does the person have an older OASys with risk of serious harm (RoSH) information?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Does ${this.personName} have an older OASys with risk of serious harm (RoSH) information?`

  body: OldOasysBody

  questions = getQuestions(this.personName)['risk-of-serious-harm']['old-oasys']

  constructor(
    body: Partial<OldOasysBody>,
    private readonly application: Application,
  ) {
    this.body = body as OldOasysBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'risk-to-others'
  }

  response() {
    return {
      [this.questions.hasOldOasys.question]: this.questions.hasOldOasys.answers[this.body.hasOldOasys],
      ...(this.body.hasOldOasys === 'yes' && {
        [this.questions.oasysCompletedDate.question]: DateFormats.dateAndTimeInputsToUiDate(
          this.body,
          'oasysCompletedDate',
        ),
      }),
    }
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasOldOasys) {
      errors.hasOldOasys = 'Confirm whether they have an older OASys with risk of serious harm (RoSH) information'
    }
    if (this.body.hasOldOasys === 'yes') {
      if (!dateIsComplete(this.body, 'oasysCompletedDate')) {
        errors.oasysCompletedDate = 'Enter the date the OASys was completed'
        return errors
      }

      if (!dateAndTimeInputsAreValidDates(this.body, 'oasysCompletedDate')) {
        errors.oasysCompletedDate = 'OASys completed date must be a real date'
      }
    }

    return errors
  }
}
