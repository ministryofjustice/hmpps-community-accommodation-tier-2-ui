import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type BrainInjuryBody = Record<string, never>

@Page({
  name: 'brain-injury',
  bodyProperties: [],
})
export default class BrainInjury implements TaskListPage {
  title = `Brain injury needs for ${this.application.person.name}`

  questions = {
    hasBrainInjury: {
      question: 'Has brain injury?',
      injuryDetail: {
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

    return errors
  }

  response() {
    const response = {}

    return response
  }
}
