import type { TaskListErrors, YesOrNoOrPreferNotToSay } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems, convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

const applicationQuestions = getQuestions('')

export const hasDisabilityOptions =
  applicationQuestions['equality-and-diversity-monitoring'].disability.hasDisability.answers

export const disabilityTypeOptions =
  applicationQuestions['equality-and-diversity-monitoring'].disability.typeOfDisability.answers

export type DisabilityOptions = keyof typeof disabilityTypeOptions

export type DisabilityBody = {
  hasDisability: YesOrNoOrPreferNotToSay
  typeOfDisability: Array<DisabilityOptions>
  otherDisability: string
}

@Page({
  name: 'disability',
  bodyProperties: ['hasDisability', 'typeOfDisability', 'otherDisability'],
})
export default class Disability implements TaskListPage {
  documentTitle = 'Does the person have a disability?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Equality and diversity questions for ${this.personName}`

  questions = getQuestions(this.personName)['equality-and-diversity-monitoring'].disability

  body: {
    hasDisability: YesOrNoOrPreferNotToSay
    typeOfDisability: Array<DisabilityOptions>
    otherDisability: string
  }

  constructor(
    body: Partial<DisabilityBody>,
    private readonly application: Application,
  ) {}

  previous() {
    return 'will-answer-equality-questions'
  }

  next() {
    return 'sex-and-gender'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.hasDisability) {
      errors.hasDisability = errorLookups.hasDisability.empty
    }
    if (this.body.hasDisability === 'yes' && !this.body.typeOfDisability) {
      errors.typeOfDisability = errorLookups.hasDisability.typeOfDisability
    }
    if (
      this.body.hasDisability === 'yes' &&
      this.body.typeOfDisability?.includes('other') &&
      !this.body.otherDisability
    ) {
      errors.otherDisability = errorLookups.hasDisability.otherDisability
    }
    return errors
  }

  items(conditionalHtml: string) {
    const items = convertKeyValuePairToRadioItems(hasDisabilityOptions, this.body.hasDisability)

    const yes = items.shift()
    const preferNotToSay = items.pop()
    items.push({ divider: 'or' })

    return [{ ...yes, conditional: { html: conditionalHtml } }, ...items, { ...preferNotToSay }]
  }

  typeOfDisabilityItems(otherDisabilityHtml: string) {
    const items = convertKeyValuePairToCheckboxItems(disabilityTypeOptions, this.body.typeOfDisability)
    const other = items.pop()

    return [...items, { ...other, conditional: { html: otherDisabilityHtml } }]
  }

  onSave(): void {
    if (this.body.hasDisability !== 'yes') {
      delete this.body.typeOfDisability
      delete this.body.otherDisability
    }

    if (this.body.hasDisability === 'yes' && !this.body.typeOfDisability?.includes('other')) {
      delete this.body.otherDisability
    }
  }
}
