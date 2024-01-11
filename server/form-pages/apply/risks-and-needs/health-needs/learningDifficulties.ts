import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type LearningDifficultiesBody = {
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
  documentTitle = 'Learning difficulties and neurodiversity for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Learning difficulties and neurodiversity for ${this.personName}`

  questions = getQuestions(this.personName)['health-needs']['learning-difficulties']

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
      errors.needsDetail = 'Describe their additional needs relating to learning difficulties or neurodiversity'
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
      errors.addSupportDetail = 'Describe the type of support required'
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasLearningNeeds !== 'yes') {
      delete this.body.needsDetail
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
