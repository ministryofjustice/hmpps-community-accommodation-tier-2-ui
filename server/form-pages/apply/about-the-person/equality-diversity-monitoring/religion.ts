import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type ReligionBody = {
  religion:
    | 'noReligion'
    | 'atheist'
    | 'agnostic'
    | 'christian'
    | 'buddhist'
    | 'hindu'
    | 'jewish'
    | 'muslim'
    | 'sikh'
    | 'other'
    | 'preferNotToSay'
  otherReligion: string
}

export const religionOptions = {
  noReligion: 'No religion',
  atheist: 'Atheist or Humanist',
  agnostic: 'Agnostic',
  christian: 'Christian',
  buddhist: 'Buddhist',
  hindu: 'Hindu',
  jewish: 'Jewish',
  muslim: 'Muslim',
  sikh: 'Sikh',
  other: 'Any other religion',
  preferNotToSay: 'Prefer not to say',
}

@Page({
  name: 'religion',
  bodyProperties: ['religion', 'otherReligion'],
})
export default class Religion implements TaskListPage {
  title = `Equality and diversity questions for ${nameOrPlaceholderCopy(this.application.person)}`

  questions = {
    religion: `What is ${nameOrPlaceholderCopy(this.application.person)}'s religion?`,
    otherReligion: 'What is their religion? (optional)',
  }

  body: ReligionBody

  constructor(
    body: Partial<ReligionBody>,
    private readonly application: Application,
  ) {
    this.body = body as ReligionBody
  }

  previous() {
    return 'ethnic-group'
  }

  next() {
    return 'military-veteran'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.religion) {
      errors.religion = errorLookups.religion.empty
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.religion]: religionOptions[this.body.religion],
      [this.questions.otherReligion]: this.body.otherReligion,
    }

    return response
  }

  items(otherReligionHtml: string) {
    const items = convertKeyValuePairToRadioItems(religionOptions, this.body.religion) as [Radio]

    items.forEach(item => {
      if (item.value === 'other') {
        item.conditional = { html: otherReligionHtml }
      }
      if (item.value === 'christian') {
        item.hint = { text: 'Including Church of England, Catholic, Protestant and all other Christian denominations.' }
      }
    })
    const preferNotToSay = items.pop()

    return [...items, { divider: 'or' }, { ...preferNotToSay }]
  }
}
