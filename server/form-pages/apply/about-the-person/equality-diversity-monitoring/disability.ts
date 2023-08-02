import type { TaskListErrors, YesOrNoOrPreferNotToSay } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems, convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'

export const options = {
  yes: 'Yes',
  no: 'No',
  preferNotToSay: 'Prefer not to say',
}

export const disabilityOptions = {
  sensoryImpairment: 'Sensory impairment',
  physicalImpairment: 'Physical impairment',
  learningDisability: 'Learning disability or difficulty',
  mentalHealth: 'Mental health condition',
  illness: 'Long-standing illness',
  other: 'Other',
}

export type DisabilityOptions = keyof typeof disabilityOptions

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
  title = `Equality and diversity questions for ${this.application.person.name}`

  questions = {
    hasDisability: `Does ${this.application.person.name} have a disability?`,
    typeOfDisability: {
      question: `What type of disability?`,
      hint: 'Select all that apply',
    },
    otherDisability: 'What is the disability?',
  }

  body: DisabilityBody

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
    if (this.body.typeOfDisability?.includes('other') && !this.body.otherDisability) {
      errors.otherDisability = errorLookups.hasDisability.otherDisability
    }
    return errors
  }

  response() {
    let response: Record<string, string | Array<string>> = {
      [this.questions.hasDisability]: options[this.body.hasDisability],
    }

    if (this.body.typeOfDisability) {
      response = {
        ...response,
        [this.questions.typeOfDisability.question]: this.body.typeOfDisability.map(
          disability => disabilityOptions[disability],
        ),
        [this.questions.otherDisability]: this.body.otherDisability,
      }
    }

    return response
  }

  items(conditionalHtml: string) {
    const items = convertKeyValuePairToRadioItems(options, this.body.hasDisability)

    const yes = items.shift()
    const preferNotToSay = items.pop()
    items.push({ divider: 'or' })

    return [{ ...yes, conditional: { html: conditionalHtml } }, ...items, { ...preferNotToSay }]
  }

  typeOfDisabilityItems(otherDisabilityHtml: string) {
    const items = convertKeyValuePairToCheckboxItems(disabilityOptions, this.body.typeOfDisability)
    const other = items.pop()

    return [...items, { ...other, conditional: { html: otherDisabilityHtml } }]
  }
}
