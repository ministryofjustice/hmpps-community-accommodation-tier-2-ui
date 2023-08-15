import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type OtherHealthBody = Record<string, never>

@Page({
  name: 'other-health',
  bodyProperties: [],
})
export default class OtherHealth implements TaskListPage {
  title = `Other health needs for ${this.application.person.name}`

  questions = {
    hasLongTermHealthCondition: {
      question: 'Are they managing any long term health conditions?',
      hint: 'For example, diabetes, arthritis or high blood pressure.',
      healthConditionDetail: {
        question: 'Please describe the long term health conditions.',
      },
      hasHadStroke: {
        question: 'Have they experienced a stroke?',
      },
    },
    hasSeizures: {
      question: 'Do they experience seizures?',
      seizuresDetail: {
        question: 'Please describe the type and any treatment.',
      },
    },
    beingTreatedForCancer: {
      question: 'Are they currently receiving regular treatment for cancer?',
    },
  }

  body: OtherHealthBody

  constructor(
    body: Partial<OtherHealthBody>,
    private readonly application: Application,
  ) {
    this.body = body as OtherHealthBody
  }

  previous() {
    return 'brain-injury'
  }

  next() {
    return ''
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
