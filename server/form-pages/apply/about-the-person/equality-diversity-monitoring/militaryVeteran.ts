import type { TaskListErrors, YesNoOrIDK } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'

export const options = {
  yes: 'Yes',
  no: 'No',
  dontKnow: `I don't know`,
}

export type MilitaryVeteranBody = {
  isVeteran: YesNoOrIDK
}

@Page({
  name: 'military-veteran',
  bodyProperties: ['isVeteran'],
})
export default class MilitaryVeteran implements TaskListPage {
  title = `Equality and diversity questions for ${this.application.person.name}`

  questions = {
    isVeteran: `Is ${this.application.person.name} a military veteran?`,
  }

  body: MilitaryVeteranBody

  constructor(
    body: Partial<MilitaryVeteranBody>,
    private readonly application: Application,
  ) {}

  previous() {
    return 'religion'
  }

  next() {
    return 'care-leaver'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.isVeteran) {
      errors.isVeteran = errorLookups.isVeteran.empty
    }
    return errors
  }

  response() {
    return {
      [this.questions.isVeteran]: options[this.body.isVeteran],
    }
  }

  items() {
    const items = convertKeyValuePairToRadioItems(options, this.body.isVeteran)

    const dontKnow = items.pop()
    items.push({ divider: 'or' })

    return [...items, { ...dontKnow }]
  }
}
