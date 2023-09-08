import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type SexualOrientationBody = {
  orientation: 'heterosexual' | 'gay' | 'lesbian' | 'bisexual' | 'other' | 'preferNotToSay'
  otherOrientation: string
}

export const orientationOptions = {
  heterosexual: 'Heterosexual or straight',
  gay: 'Gay',
  lesbian: 'Lesbian',
  bisexual: 'Bisexual',
  other: 'Other',
  preferNotToSay: 'Prefer not to say',
}

@Page({
  name: 'sexual-orientation',
  bodyProperties: ['orientation', 'otherOrientation'],
})
export default class SexualOrientation implements TaskListPage {
  documentTitle = "Which of the following best describes the person's sexual orientation?"

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Equality and diversity questions for ${this.personName}`

  questions = {
    orientation: `Which of the following best describes ${this.personName}'s sexual orientation?`,
    otherOrientation: 'How would they describe their sexual orientation? (optional)',
  }

  body: SexualOrientationBody

  constructor(
    body: Partial<SexualOrientationBody>,
    private readonly application: Application,
  ) {
    this.body = body as SexualOrientationBody
  }

  previous() {
    return 'sex-and-gender'
  }

  next() {
    return 'ethnic-group'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.orientation) {
      errors.orientation = errorLookups.sexualOrientation.orientation
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.orientation]: orientationOptions[this.body.orientation],
      [this.questions.otherOrientation]: this.body.otherOrientation,
    }

    return response
  }

  items(otherOrientationHtml: string) {
    const items = convertKeyValuePairToRadioItems(orientationOptions, this.body.orientation) as [Radio]
    items.forEach(item => {
      if (item.value === 'other') {
        item.conditional = { html: otherOrientationHtml }
      }
    })

    return items
  }
}
