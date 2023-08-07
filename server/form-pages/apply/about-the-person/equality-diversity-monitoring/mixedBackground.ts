import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'

export type MixedBackgroundBody = {
  mixedBackground: 'whiteAndBlackCaribbean' | 'whiteAndBlackAfrican' | 'whiteAndAsian' | 'other' | 'preferNotToSay'
  optionalMixedBackground: string
}

export const mixedBackgroundOptions = {
  whiteAndBlackCaribbean: 'White and Black Caribbean',
  whiteAndBlackAfrican: 'White and Black African',
  whiteAndAsian: 'White and Asian',
  other: 'Any other mixed or multiple ethnic background',
  preferNotToSay: 'Prefer not to say',
}

@Page({
  name: 'mixed-background',
  bodyProperties: ['mixedBackground', 'optionalMixedBackground'],
})
export default class MixedBackground implements TaskListPage {
  title = `Equality and diversity questions for ${this.application.person.name}`

  questions = {
    mixedBackground: `Which of the following best describes ${this.application.person.name}'s mixed or multiple ethnic groups background?`,
    optionalMixedBackground: 'How would they describe their background? (optional)',
  }

  body: MixedBackgroundBody

  constructor(
    body: Partial<MixedBackgroundBody>,
    private readonly application: Application,
  ) {
    this.body = body as MixedBackgroundBody
  }

  previous() {
    return 'ethnic-group'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.mixedBackground) {
      errors.mixedBackground = errorLookups.background.empty
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.mixedBackground]: mixedBackgroundOptions[this.body.mixedBackground],
      [this.questions.optionalMixedBackground]: this.body.optionalMixedBackground,
    }

    return response
  }

  items(optionalMixedBackground: string) {
    const items = convertKeyValuePairToRadioItems(mixedBackgroundOptions, this.body.mixedBackground) as [Radio]

    items.forEach(item => {
      if (item.value === 'other') {
        item.conditional = { html: optionalMixedBackground }
      }
    })
    const preferNotToSay = items.pop()

    return [...items, { divider: 'or' }, { ...preferNotToSay }]
  }
}
