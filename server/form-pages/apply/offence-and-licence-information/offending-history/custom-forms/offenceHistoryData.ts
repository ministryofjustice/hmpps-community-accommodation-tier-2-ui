import type { SelectItem, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application } from '@approved-premises/api'
import { Page } from '../../../../utils/decorators'
import TaskListPage from '../../../../taskListPage'
import { dateAndTimeInputsAreValidDates } from '../../../../../utils/dateUtils'
import { getQuestions } from '../../../../utils/questions'
import { nameOrPlaceholderCopy } from '../../../../../utils/utils'

export type OffenceHistoryDataBody = {
  titleAndNumber: string
  offenceCategory: string
  offenceDate: string
  'offenceDate-day': string
  'offenceDate-month': string
  'offenceDate-year': string
  sentenceLength: string
  summary: string
}

@Page({
  name: 'offence-history-data',
  bodyProperties: [
    'titleAndNumber',
    'offenceCategory',
    'offenceDate-day',
    'offenceDate-month',
    'offenceDate-year',
    'sentenceLength',
    'summary',
  ],
})
export default class OffenceHistoryData implements TaskListPage {
  personName = nameOrPlaceholderCopy(this.application.person)

  documentTitle = 'Add a previous offence'

  title = `Add a previous offence for ${this.personName}`

  body: OffenceHistoryDataBody

  taskName = 'offending-history'

  pageName = 'offence-history-data'

  questions = getQuestions('')['offending-history']['offence-history-data']

  offenceCategories: Array<SelectItem>

  constructor(
    body: Partial<OffenceHistoryDataBody>,
    private readonly application: Cas2Application,
  ) {
    this.body = body as OffenceHistoryDataBody
    this.offenceCategories = this.getCategoriesAsItemsForSelect(this.body.offenceCategory)
  }

  private getCategoriesAsItemsForSelect(selectedItem: string) {
    const items = [
      {
        value: 'choose',
        text: 'Choose category',
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
    return 'offence-history'
  }

  next() {
    return 'offence-history'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.titleAndNumber) {
      errors.titleAndNumber = 'Enter the offence title'
    }
    if (this.body.offenceCategory === 'choose') {
      errors.offenceCategory = 'Select the offence category'
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

    return errors
  }

  response() {
    return {}
  }
}
