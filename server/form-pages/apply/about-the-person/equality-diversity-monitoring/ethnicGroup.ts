import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'

type EthnicGroupBody = {
  ethnicGroup: 'white' | 'mixed' | 'asian' | 'black' | 'other' | 'preferNotToSay'
}

export const ethnicGroupOptions = {
  white: 'White',
  mixed: 'Mixed or multiple ethnic groups',
  asian: 'Asian or Asian British',
  black: 'Black, African, Caribbean or Black British',
  other: 'Other ethnic group',
  preferNotToSay: 'Prefer not to say',
}

@Page({
  name: 'ethnic-group',
  bodyProperties: ['ethnicGroup'],
})
export default class EthnicGroup implements TaskListPage {
  title = `Equality and diversity questions for ${this.application.person.name}`

  questions = {
    ethnicGroup: `What is ${this.application.person.name}'s ethnic group?`,
  }

  body: EthnicGroupBody

  constructor(
    body: Partial<EthnicGroupBody>,
    private readonly application: Application,
  ) {
    this.body = body as EthnicGroupBody
  }

  previous() {
    return 'sexual-orientation'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.ethnicGroup) {
      errors.ethnicGroup = errorLookups.ethnicGroup.empty
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.ethnicGroup]: ethnicGroupOptions[this.body.ethnicGroup],
    }

    return response
  }

  items() {
    const items = convertKeyValuePairToRadioItems(ethnicGroupOptions, this.body.ethnicGroup)

    const preferNotToSay = items.pop()
    items.push({ divider: 'or' })

    return [...items, { ...preferNotToSay }]
  }
}
