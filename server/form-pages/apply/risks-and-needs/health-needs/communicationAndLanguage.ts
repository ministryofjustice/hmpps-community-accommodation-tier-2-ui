import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type CommunicationAndLanguageBody = Record<string, never>

@Page({
  name: 'communication-and-language',
  bodyProperties: [],
})
export default class CommunicationAndLanguage implements TaskListPage {
  title = `Communication and language needs for ${this.application.person.name}`

  questions = {
    hasCommunicationNeeds: {
      question: 'Has communication needs?',
      communicationDetail: {
        question: 'Details',
      },
    },
    requiresInterpreter: {
      question: 'Needs interpreter?',
      interpretationDetail: {
        question: 'Details',
      },
    },
    hasSupportNeeds: {
      question: 'Has support needs?',
      supportDetail: {
        question: 'Details',
      },
    },
  }

  body: CommunicationAndLanguageBody

  constructor(
    body: Partial<CommunicationAndLanguageBody>,
    private readonly application: Application,
  ) {
    this.body = body as CommunicationAndLanguageBody
  }

  previous() {
    return 'mental-health'
  }

  next() {
    return 'learning-difficulties'
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
