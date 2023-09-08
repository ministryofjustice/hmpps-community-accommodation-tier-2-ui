import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

export type OtherBackgroundBody = {
  otherBackground: 'arab' | 'other' | 'preferNotToSay'
  optionalOtherBackground: string
}

export const otherBackgroundOptions = {
  arab: 'Arab',
  other: 'Any other ethnic group',
  preferNotToSay: 'Prefer not to say',
}

@Page({
  name: 'other-background',
  bodyProperties: ['otherBackground', 'optionalOtherBackground'],
})
export default class OtherBackground implements TaskListPage {
  documentTitle = "Which of the following best describes the person's background?"

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Equality and diversity questions for ${this.personName}`

  questions = {
    otherBackground: `Which of the following best describes ${this.personName}'s background?`,
    optionalOtherBackground: 'How would they describe their background? (optional)',
  }

  body: OtherBackgroundBody

  constructor(
    body: Partial<OtherBackgroundBody>,
    private readonly application: Application,
  ) {
    this.body = body as OtherBackgroundBody
  }

  previous() {
    return 'ethnic-group'
  }

  next() {
    return 'religion'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.otherBackground) {
      errors.otherBackground = errorLookups.background.empty
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.otherBackground]: otherBackgroundOptions[this.body.otherBackground],
      [this.questions.optionalOtherBackground]: this.body.optionalOtherBackground,
    }

    return response
  }

  items(optionalOtherBackground: string) {
    const items = convertKeyValuePairToRadioItems(otherBackgroundOptions, this.body.otherBackground) as [Radio]

    items.forEach(item => {
      if (item.value === 'other') {
        item.conditional = { html: optionalOtherBackground }
      }
    })
    const preferNotToSay = items.pop()

    return [...items, { divider: 'or' }, { ...preferNotToSay }]
  }
}
