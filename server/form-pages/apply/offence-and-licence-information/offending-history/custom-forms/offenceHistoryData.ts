import type { SelectItem, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application } from '@approved-premises/api'
import { Page } from '../../../../utils/decorators'
import TaskListPage from '../../../../taskListPage'
import { getQuestions } from '../../../../utils/questions'
import { nameOrPlaceholderCopy } from '../../../../../utils/utils'

export type OffenceHistoryDataBody = {
  offenceGroupName: string
  offenceCategory: string
  numberOfOffences: string
  sentenceTypes: string
  summary: string
}

@Page({
  name: 'offence-history-data',
  bodyProperties: ['offenceGroupName', 'offenceCategory', 'numberOfOffences', 'sentenceTypes', 'summary'],
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
    return 'offence-history'
  }

  next() {
    return 'offence-history'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.offenceGroupName) {
      errors.offenceGroupName = 'Enter the offence group name'
    }
    if (this.body.offenceCategory === 'choose') {
      errors.offenceCategory = 'Select the offence type'
    }
    if (!this.body.numberOfOffences) {
      errors.numberOfOffences = 'Enter the number of offences'
    }
    if (!this.body.sentenceTypes) {
      errors.sentenceTypes = 'Enter the sentence type(s)'
    }
    if (!this.body.summary) {
      errors.summary = 'Enter the offence details'
    }

    return errors
  }

  response() {
    return {}
  }
}
