import { Cas2Application as Application } from '@approved-premises/api'
import { TaskListErrors, YesNoOrDontKnow } from '@approved-premises/ui'
import { DateFormats, dateAndTimeInputsAreValidDates } from '../../../../utils/dateUtils'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import TaskListPage from '../../../taskListPage'
import { Page } from '../../../utils/decorators'
import { getQuestions } from '../../../utils/questions'

export type PregnancyInformationBody = {
  isPregnant: YesNoOrDontKnow
  dueDate: string
  'dueDate-month': string
  'dueDate-year': string
  'dueDate-day': string
}

@Page({
  name: 'pregnancy-information',
  bodyProperties: ['isPregnant', 'dueDate-month', 'dueDate-year', 'dueDate-day', 'dueDate'],
})
export default class PregnancyInformation implements TaskListPage {
  documentTitle = 'Is the person pregnant?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Is ${nameOrPlaceholderCopy(this.application.person)} pregnant?`

  questions = getQuestions(this.personName)['personal-information']['pregnancy-information']

  body: PregnancyInformationBody

  constructor(
    body: Partial<PregnancyInformationBody>,
    private readonly application: Application,
  ) {
    this.body = body as PregnancyInformationBody
  }

  previous() {
    return 'immigration-status'
  }

  next() {
    return 'support-worker-preference'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.isPregnant) {
      errors.isPregnant = `Choose either Yes, No or I don't know`
    }

    if (this.body.isPregnant === 'yes' && !dateAndTimeInputsAreValidDates(this.body, 'dueDate')) {
      errors.dueDate = 'Enter the due date'
    }

    return errors
  }

  response() {
    const response = {}

    response[`${this.questions.isPregnant.question}`] = this.questions.isPregnant.answers[this.body.isPregnant]

    if (this.body.dueDate) {
      response[`${this.questions.dueDate.question}`] = DateFormats.dateAndTimeInputsToUiDate(this.body, 'dueDate')
    }

    return response
  }

  onSave(): void {
    if (this.body.isPregnant !== 'yes') {
      delete this.body.dueDate
      delete this.body['dueDate-day']
      delete this.body['dueDate-month']
      delete this.body['dueDate-year']
    }
  }
}
