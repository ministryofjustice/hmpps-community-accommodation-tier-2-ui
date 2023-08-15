import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { sentenceCase } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type OtherHealthBody = {
  hasLongTermHealthCondition: YesOrNo
  healthConditionDetail: string
  hasHadStroke: YesOrNo
  hasSeizures: YesOrNo
  seizuresDetail: string
  beingTreatedForCancer: YesOrNo
}

@Page({
  name: 'other-health',
  bodyProperties: [
    'hasLongTermHealthCondition',
    'healthConditionDetail',
    'hasHadStroke',
    'hasSeizures',
    'seizuresDetail',
    'beingTreatedForCancer',
  ],
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

    if (!this.body.hasLongTermHealthCondition) {
      errors.hasLongTermHealthCondition = `Confirm whether they have a long term health condition`
    }

    if (!this.body.hasSeizures) {
      errors.hasSeizures = `Confirm whether they have seizures`
    }

    if (!this.body.beingTreatedForCancer) {
      errors.beingTreatedForCancer = `Confirm whether they are receiving cancer treatment`
    }

    return errors
  }

  response() {
    const response = {
      [this.questions.hasLongTermHealthCondition.question]: sentenceCase(this.body.hasLongTermHealthCondition),
      [this.questions.hasLongTermHealthCondition.healthConditionDetail.question]: this.body.healthConditionDetail,
      [this.questions.hasLongTermHealthCondition.hasHadStroke.question]: sentenceCase(this.body.hasHadStroke),

      [this.questions.hasSeizures.question]: sentenceCase(this.body.hasSeizures),
      [this.questions.hasSeizures.seizuresDetail.question]: this.body.seizuresDetail,

      [this.questions.beingTreatedForCancer.question]: sentenceCase(this.body.beingTreatedForCancer),
    }

    return response
  }
}
