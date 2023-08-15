import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type LearningDifficultiesBody = Record<string, never>

@Page({
  name: 'learning-difficulties',
  bodyProperties: [],
})
export default class LearningDifficulties implements TaskListPage {
  title = `Learning difficulties and neurodiversity for ${this.application.person.name}`

  questions = {
    hasLearningNeeds: {
      question: 'Has learning needs?',
      needsDetail: {
        question: 'Details',
      },
    },
    isVulnerable: {
      question: 'Is vulnerable?',
      vulnerabilityDetail: {
        question: 'Details',
      },
    },
    hasDifficultyInteracting: {
      question: 'Has difficulty interacting?',
      interactionDetail: {
        question: 'Details',
      },
    },
    requiresAdditionalSupport: {
      question: 'Needs additional support?',
      addSupportDetail: {
        question: 'Details',
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

    return errors
  }

  response() {
    const response = {}

    return response
  }
}
