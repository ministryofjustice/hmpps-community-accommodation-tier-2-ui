import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

const applicationQuestions = getQuestions('')

export const religionOptions = applicationQuestions['equality-and-diversity-monitoring'].religion.religion.answers

export type ReligionBody = {
  religion: keyof typeof religionOptions
  otherReligion: string
}

@Page({
  name: 'religion',
  bodyProperties: ['religion', 'otherReligion'],
})
export default class Religion implements TaskListPage {
  documentTitle = "What is the person's religion?"

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Equality and diversity questions for ${this.personName}`

  questions = getQuestions(this.personName)['equality-and-diversity-monitoring'].religion

  body: ReligionBody

  constructor(
    body: Partial<ReligionBody>,
    private readonly application: Application,
  ) {
    this.body = body as ReligionBody
  }

  previous() {
    switch (this.application.data?.['equality-and-diversity-monitoring']?.['ethnic-group']?.ethnicGroup) {
      case 'white':
        return 'white-background'
      case 'mixed':
        return 'mixed-background'
      case 'asian':
        return 'asian-background'
      case 'black':
        return 'black-background'
      case 'other':
        return 'other-background'
      default:
        return 'ethnic-group'
    }
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

  onSave(): void {
    if (this.body.religion !== 'other') {
      delete this.body.otherReligion
    }
  }
}
