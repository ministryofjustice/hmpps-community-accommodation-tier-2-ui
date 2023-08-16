import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { sentenceCase } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type LearningDifficultiesBody = {
  hasLearningNeeds: YesOrNo
  needsDetail: string
  isVulnerable: YesOrNo
  vulnerabilityDetail: string
  hasDifficultyInteracting: YesOrNo
  interactionDetail: string
  requiresAdditionalSupport: YesOrNo
  addSupportDetail: string
}

@Page({
  name: 'learning-difficulties',
  bodyProperties: [
    'hasLearningNeeds',
    'needsDetail',
    'isVulnerable',
    'vulnerabilityDetail',
    'hasDifficultyInteracting',
    'interactionDetail',
    'requiresAdditionalSupport',
    'addSupportDetail',
  ],
})
export default class LearningDifficulties implements TaskListPage {
  title = `Learning difficulties and neurodiversity for ${this.application.person.name}`

  questions = {
    hasLearningNeeds: {
      question: 'Do they have any additional needs relating to learning difficulties or neurodiversity?',
      needsDetail: {
        question: 'Please describe their additional needs.',
      },
    },
    isVulnerable: {
      question: 'Are they vulnerable as a result of this condition?',
      vulnerabilityDetail: {
        question: 'Please describe their level of vulnerability.',
      },
    },
    hasDifficultyInteracting: {
      question: 'Do they have difficulties interacting with other people as a result of this condition?',
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

  body: LearningDifficultiesBody

  constructor(
    body: Partial<LearningDifficultiesBody>,
    private readonly application: Application,
  ) {
    this.body = body as LearningDifficultiesBody
  }

  previous() {
    return 'communication-and-language'
  }

  next() {
    return 'brain-injury'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasLearningNeeds) {
      errors.hasLearningNeeds = `Confirm whether they have additional needs`
    }
    if (this.body.hasLearningNeeds === 'yes' && !this.body.needsDetail) {
      errors.needsDetail = 'Describe their additional needs'
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
      errors.addSupportDetail = 'Describe the type of support required'
    }

    return errors
  }

  response() {
    const response = {
      [this.questions.hasLearningNeeds.question]: sentenceCase(this.body.hasLearningNeeds),
      [this.questions.hasLearningNeeds.needsDetail.question]: this.body.needsDetail,

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
