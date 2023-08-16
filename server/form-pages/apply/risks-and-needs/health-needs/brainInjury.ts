import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { sentenceCase } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type BrainInjuryBody = {
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
  title = `Brain injury needs for ${this.application.person.name}`

  questions = {
    hasBrainInjury: {
      question: 'Do they have a brain injury?',
      injuryDetail: {
        question: 'Please describe their brain injury and needs.',
      },
    },
    isVulnerable: {
      question: 'Are they vulnerable as a result of this injury?',
      vulnerabilityDetail: {
        question: 'Please describe their level of vulnerability.',
      },
    },
    hasDifficultyInteracting: {
      question: 'Do they have difficulties interacting with other people as a result of this injury?',
      interactionDetail: {
        question: 'Please describe these difficulties.',
      },
    },
    requiresAdditionalSupport: {
      question: 'Is additional support required?',
      addSupportDetail: {
        question: 'Please describe the type of support.',
      },
    },
  }

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
      errors.injuryDetail = 'Describe their injury and needs'
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
      errors.interactionDetail = 'Describe their difficulties interacting'
    }

    if (!this.body.requiresAdditionalSupport) {
      errors.requiresAdditionalSupport = `Confirm whether additional support is required`
    }
    if (this.body.requiresAdditionalSupport === 'yes' && !this.body.addSupportDetail) {
      errors.addSupportDetail = 'Describe their additional needs'
    }

    return errors
  }

  response() {
    const response = {
      [this.questions.hasBrainInjury.question]: sentenceCase(this.body.hasBrainInjury),
      [this.questions.hasBrainInjury.injuryDetail.question]: this.body.injuryDetail,

      [this.questions.isVulnerable.question]: sentenceCase(this.body.isVulnerable),
      [this.questions.isVulnerable.vulnerabilityDetail.question]: this.body.vulnerabilityDetail,

      [this.questions.hasDifficultyInteracting.question]: sentenceCase(this.body.hasDifficultyInteracting),
      [this.questions.hasDifficultyInteracting.interactionDetail.question]: this.body.interactionDetail,

      [this.questions.requiresAdditionalSupport.question]: sentenceCase(this.body.requiresAdditionalSupport),
      [this.questions.requiresAdditionalSupport.addSupportDetail.question]: this.body.addSupportDetail,
    }

    return response
  }
}
