import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'

export type BlackBackgroundBody = {
  blackBackground: 'african' | 'caribbean' | 'other' | 'preferNotToSay'
  optionalBlackBackground: string
}

export const blackBackgroundOptions = {
  african: 'African',
  caribbean: 'Caribbean',
  other: 'Any other Black, African or Caribbean background',
  preferNotToSay: 'Prefer not to say',
}

@Page({
  name: 'black-background',
  bodyProperties: ['blackBackground', 'optionalBlackBackground'],
})
export default class BlackBackground implements TaskListPage {
  title = `Equality and diversity questions for ${this.application.person.name}`

  questions = {
    blackBackground: `Which of the following best describes ${this.application.person.name}'s Black, African, Caribbean or Black British background?`,
    optionalBlackBackground: 'How would they describe their background? (optional)',
  }

  body: BlackBackgroundBody

  constructor(
    body: Partial<BlackBackgroundBody>,
    private readonly application: Application,
  ) {
    this.body = body as BlackBackgroundBody
  }

  previous() {
    return 'ethnic-group'
  }

  next() {
    return 'religion'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.blackBackground) {
      errors.blackBackground = errorLookups.background.empty
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.blackBackground]: blackBackgroundOptions[this.body.blackBackground],
      [this.questions.optionalBlackBackground]: this.body.optionalBlackBackground,
    }

    return response
  }

  items(optionalBlackBackground: string) {
    const items = convertKeyValuePairToRadioItems(blackBackgroundOptions, this.body.blackBackground) as [Radio]

    items.forEach(item => {
      if (item.value === 'other') {
        item.conditional = { html: optionalBlackBackground }
      }
    })
    const preferNotToSay = items.pop()

    return [...items, { divider: 'or' }, { ...preferNotToSay }]
  }
}
