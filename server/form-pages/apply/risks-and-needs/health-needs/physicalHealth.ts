import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type PhysicalHealthBody = Record<string, never>

@Page({
  name: 'physical-health',
  bodyProperties: [],
})
export default class PhysicalHealth implements TaskListPage {
  title = `Physical health needs for ${this.application.person.name}`

  questions = {
    hasPhyHealthNeeds: {
      question: 'Physical health needs?',
      needsDetail: {
        question: 'Details',
      },
      canClimbStairs: {
        question: 'Can climb stairs',
      },
    },
    isReceivingTreatment: {
      question: 'Is receiving treatment?',
      treatmentDetail: {
        question: 'Treatment detail',
      },
    },
    hasPhyHealthMedication: {
      question: 'Receives medication?',
      medicationDetail: {
        question: 'Medication detail',
      },
    },
    canLiveIndependently: {
      question: 'Can live independently?',
      indyLivingDetail: {
        question: 'Independent living detail',
      },
    },
    requiresAdditionalSupport: {
      question: 'Requires additional support?',
      addSupportDetail: {
        question: 'Additional support details',
      },
    },
  }

  body: PhysicalHealthBody

  constructor(
    body: Partial<PhysicalHealthBody>,
    private readonly application: Application,
  ) {
    this.body = body as PhysicalHealthBody
  }

  previous() {
    return 'substance-misuse'
  }

  next() {
    return 'mental-health'
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
