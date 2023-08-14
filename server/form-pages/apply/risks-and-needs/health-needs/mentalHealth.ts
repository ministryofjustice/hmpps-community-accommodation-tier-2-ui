import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type MentalHealthBody = Record<string, never>

@Page({
  name: 'mental-health',
  bodyProperties: [],
})
export default class MentalHealth implements TaskListPage {
  title = `Mental health needs for ${this.application.person.name}`

  questions = {
    hasMentalHealthNeeds: {
      question: 'Mental health needs?',
      needsDetail: {
        question: 'Details',
      },
    },
    isEngagedWithCommunity: {
      question: 'Is engaged with community services?',
      servicesDetail: {
        question: 'Provide details',
      },
    },
    hasPrescribedMedication: {
      question: 'Has prescribed medication?',
      isInPossessionOfMeds: {
        question: 'Do they have their meds?',
      },
      medicationDetail: {
        question: 'List their meds',
      },
      medicationIssues: {
        question: 'Detail on issues',
      },
    },
  }

  body: MentalHealthBody

  constructor(
    body: Partial<MentalHealthBody>,
    private readonly application: Application,
  ) {
    this.body = body as MentalHealthBody
  }

  previous() {
    return 'physical-health'
  }

  next() {
    return 'communication-and-language'
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
