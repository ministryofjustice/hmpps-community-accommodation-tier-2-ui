import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'

export type AsianBackgroundBody = {
  asianBackground: 'indian' | 'pakistani' | 'chinese' | 'bangladeshi' | 'other' | 'preferNotToSay'
  optionalAsianBackground: string
}

export const asianBackgroundOptions = {
  indian: 'Indian',
  pakistani: 'Pakistani',
  chinese: 'Chinese',
  bangladeshi: 'Bangladeshi',
  other: 'Any other Asian background',
  preferNotToSay: 'Prefer not to say',
}

@Page({
  name: 'asian-background',
  bodyProperties: ['asianBackground', 'optionalAsianBackground'],
})
export default class AsianBackground implements TaskListPage {
  title = `Equality and diversity questions for ${this.application.person.name}`

  questions = {
    asianBackground: `Which of the following best describes ${this.application.person.name}'s Asian or Asian British background?`,
    optionalAsianBackground: 'How would they describe their background? (optional)',
  }

  body: AsianBackgroundBody

  constructor(
    body: Partial<AsianBackgroundBody>,
    private readonly application: Application,
  ) {
    this.body = body as AsianBackgroundBody
  }

  previous() {
    return 'ethnic-group'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.asianBackground) {
      errors.asianBackground = errorLookups.background.empty
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.asianBackground]: asianBackgroundOptions[this.body.asianBackground],
      [this.questions.optionalAsianBackground]: this.body.optionalAsianBackground,
    }

    return response
  }

  items(optionalAsianBackground: string) {
    const items = convertKeyValuePairToRadioItems(asianBackgroundOptions, this.body.asianBackground) as [Radio]

    items.forEach(item => {
      if (item.value === 'other') {
        item.conditional = { html: optionalAsianBackground }
      }
    })
    const preferNotToSay = items.pop()

    return [...items, { divider: 'or' }, { ...preferNotToSay }]
  }
}
