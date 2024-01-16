import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type BrainInjuryBody = {
  hasBrainInjury: YesOrNo
  injuryDetail: string
  isVulnerable: YesOrNo
  vulnerabilityDetail: string
  hasDifficultyInteracting: YesOrNo
  interactionDetail: string
  requiresAdditionalSupport: YesOrNo
  addSupportDetail: string
}

@Page({
  name: 'brain-injury',
  bodyProperties: [
    'hasBrainInjury',
    'injuryDetail',
    'isVulnerable',
    'vulnerabilityDetail',
    'hasDifficultyInteracting',
    'interactionDetail',
    'requiresAdditionalSupport',
    'addSupportDetail',
  ],
})
export default class BrainInjury implements TaskListPage {
  documentTitle = 'Brain injury needs for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Brain injury needs for ${this.personName}`

  questions = getQuestions(this.personName)['health-needs']['brain-injury']

  body: BrainInjuryBody

  constructor(
    body: Partial<BrainInjuryBody>,
    private readonly application: Application,
  ) {
    this.body = body as BrainInjuryBody
  }

  previous() {
    return 'learning-difficulties'
  }

  next() {
    return 'other-health'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasBrainInjury) {
      errors.hasBrainInjury = `Confirm whether they have a brain injury`
    }
    if (this.body.hasBrainInjury === 'yes' && !this.body.injuryDetail) {
      errors.injuryDetail = 'Describe their brain injury and needs'
    }

    if (!this.body.isVulnerable) {
      errors.isVulnerable = `Confirm whether they are vulnerable`
    }
    if (this.body.isVulnerable === 'yes' && !this.body.vulnerabilityDetail) {
      errors.vulnerabilityDetail = 'Describe their level of vulnerability'
    }

    if (!this.body.hasDifficultyInteracting) {
      errors.hasDifficultyInteracting = `Confirm whether they have difficulties interacting`
    }
    if (this.body.hasDifficultyInteracting === 'yes' && !this.body.interactionDetail) {
      errors.interactionDetail = 'Describe their difficulties interacting with other people'
    }

    if (!this.body.requiresAdditionalSupport) {
      errors.requiresAdditionalSupport = `Confirm whether additional support is required`
    }
    if (this.body.requiresAdditionalSupport === 'yes' && !this.body.addSupportDetail) {
      errors.addSupportDetail = 'Describe the additional support required'
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasBrainInjury !== 'yes') {
      delete this.body.injuryDetail
    }

    if (this.body.isVulnerable !== 'yes') {
      delete this.body.vulnerabilityDetail
    }

    if (this.body.hasDifficultyInteracting !== 'yes') {
      delete this.body.interactionDetail
    }

    if (this.body.requiresAdditionalSupport !== 'yes') {
      delete this.body.addSupportDetail
    }
  }
}
