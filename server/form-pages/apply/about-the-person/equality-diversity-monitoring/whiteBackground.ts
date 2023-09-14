import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

export type WhiteBackgroundBody = {
  whiteBackground: 'english' | 'Irish' | 'Gypsy or Irish Traveller' | 'other' | 'preferNotToSay'
  optionalWhiteBackground: string
}

export const whiteBackgroundOptions = {
  english: 'English, Welsh, Scottish, Northern Irish or British',
  irish: 'Irish',
  gypsy: 'Gypsy or Irish Traveller',
  other: 'Any other White background',
  preferNotToSay: 'Prefer not to say',
}

@Page({
  name: 'white-background',
  bodyProperties: ['whiteBackground', 'optionalWhiteBackground'],
})
export default class WhiteBackground implements TaskListPage {
  documentTitle = "Which of the following best describes the person's White background?"

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Equality and diversity questions for ${this.personName}`

  questions = {
    whiteBackground: `Which of the following best describes ${this.personName}'s White background?`,
    optionalWhiteBackground: 'How would they describe their background? (optional)',
  }

  body: WhiteBackgroundBody

  constructor(
    body: Partial<WhiteBackgroundBody>,
    private readonly application: Application,
  ) {
    this.body = body as WhiteBackgroundBody
  }

  previous() {
    return 'ethnic-group'
  }

  next() {
    return 'religion'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.whiteBackground) {
      errors.whiteBackground = errorLookups.background.empty
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.whiteBackground]: whiteBackgroundOptions[this.body.whiteBackground],
      [this.questions.optionalWhiteBackground]: this.body.optionalWhiteBackground,
    }

    return response
  }

  items(optionalWhiteBackground: string) {
    const items = convertKeyValuePairToRadioItems(whiteBackgroundOptions, this.body.whiteBackground) as [Radio]

    items.forEach(item => {
      if (item.value === 'other') {
        item.conditional = { html: optionalWhiteBackground }
      }
    })
    const preferNotToSay = items.pop()

    return [...items, { divider: 'or' }, { ...preferNotToSay }]
  }
}
