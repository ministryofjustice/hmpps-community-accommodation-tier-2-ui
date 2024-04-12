import type { SelectItem, TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application } from '@approved-premises/api'
import { Page } from '../../../../utils/decorators'
import TaskListPage from '../../../../taskListPage'
import { dateAndTimeInputsAreValidDates } from '../../../../../utils/dateUtils'
import { getQuestions } from '../../../../utils/questions'
import { nameOrPlaceholderCopy } from '../../../../../utils/utils'

export type CurrentOffenceDataBody = {
  titleAndNumber: string
  offenceCategory: string
  offenceDate: string
  'offenceDate-day': string
  'offenceDate-month': string
  'offenceDate-year': string
  sentenceLength: string
  summary: string
  outstandingCharges: YesOrNo
  outstandingChargesDetail: string
}

@Page({
  name: 'current-offence-data',
  bodyProperties: [
    'titleAndNumber',
    'offenceCategory',
    'offenceDate-day',
    'offenceDate-month',
    'offenceDate-year',
    'sentenceLength',
    'summary',
    'outstandingCharges',
    'outstandingChargesDetail',
  ],
})
export default class CurrentOffenceData implements TaskListPage {
  personName = nameOrPlaceholderCopy(this.application.person)

  documentTitle = 'Add a current offence'

  title = `Add ${this.personName}'s current offence details`

  body: CurrentOffenceDataBody

  taskName = 'current-offences'

  pageName = 'current-offence-data'

  questions = getQuestions('')['current-offences']['current-offence-data']

  offenceCategories: Array<SelectItem>

  hasPreviouslySavedACurrentOffence: boolean

  constructor(
    body: Partial<CurrentOffenceDataBody>,
    private readonly application: Cas2Application,
  ) {
    this.body = body as CurrentOffenceDataBody
    this.offenceCategories = this.getCategoriesAsItemsForSelect(this.body.offenceCategory)
    this.hasPreviouslySavedACurrentOffence = Boolean(application.data['current-offences']?.['current-offence-data'])
  }

  private getCategoriesAsItemsForSelect(selectedItem: string): Array<SelectItem> {
    const items = [
      {
        value: 'choose',
        text: 'Choose type',
        selected: selectedItem === '',
      },
    ]
    Object.keys(this.questions.offenceCategory.answers).forEach(value => {
      items.push({
        value,
        text: this.questions.offenceCategory.answers[value] as string,
        selected: selectedItem === value,
      })
    })

    return items
  }

  previous() {
    return 'current-offences'
  }

  next() {
    return 'current-offences'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.titleAndNumber) {
      errors.titleAndNumber = 'Enter the offence title'
    }
    if (this.body.offenceCategory === 'choose') {
      errors.offenceCategory = 'Select the offence type'
    }
    if (!dateAndTimeInputsAreValidDates(this.body, 'offenceDate')) {
      errors.offenceDate = 'Enter the date the offence was committed'
    }
    if (!this.body.sentenceLength) {
      errors.sentenceLength = 'Enter the sentence length'
    }
    if (!this.body.summary) {
      errors.summary = 'Enter a summary of the offence'
    }

    if (!this.body.outstandingCharges) {
      errors.outstandingCharges = 'Select whether there are any outstanding charges'
    }

    if (this.body.outstandingCharges === 'yes' && !this.body.outstandingChargesDetail) {
      errors.outstandingChargesDetail = 'Enter the details of the outstanding charges'
    }

    return errors
  }

  response() {
    return {}
  }
}
