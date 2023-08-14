import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import { sentenceCase } from '../../../../utils/utils'
import TaskListPage from '../../../taskListPage'

type PhysicalHealthBody = {
  hasPhyHealthNeeds: YesOrNo
  needsDetail: string
  canClimbStairs: YesOrNo
  isReceivingTreatment: YesOrNo
  treatmentDetail: string
  hasPhyHealthMedication: YesOrNo
  medicationDetail: string
  canLiveIndependently: YesOrNo
  indyLivingDetail: string
  requiresAdditionalSupport: YesOrNo
  addSupportDetail: string
}

@Page({
  name: 'physical-health',
  bodyProperties: [
    'hasPhyHealthNeeds',
    'needsDetail',
    'canClimbStairs',
    'isReceivingTreatment',
    'treatmentDetail',
    'hasPhyHealthMedication',
    'medicationDetail',
    'canLiveIndependently',
    'indyLivingDetail',
    'requiresAdditionalSupport',
    'addSupportDetail',
  ],
})
export default class PhysicalHealth implements TaskListPage {
  title = `Physical health needs for ${this.application.person.name}`

  questions = {
    hasPhyHealthNeeds: {
      question: 'Do they have any physical health needs?',
      needsDetail: {
        question: 'Please describe their needs.',
      },
      canClimbStairs: {
        question: 'Can they climb stairs?',
      },
    },
    isReceivingTreatment: {
      question: 'Are they currently receiving any medical treatment for their physical health needs?',
      treatmentDetail: {
        question: 'Please describe their treatment.',
      },
    },
    hasPhyHealthMedication: {
      question: 'Are they currently receiving any medication for their physical health needs?',
      medicationDetail: {
        question: 'Please describe their medication.',
      },
    },
    canLiveIndependently: {
      question: 'Can they live independently?',
      indyLivingDetail: {
        question: "Please describe why they can't.",
      },
    },
    requiresAdditionalSupport: {
      question: 'Do they require any additional support?',
      addSupportDetail: {
        question: 'Please describe the types of support.',
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
    const response = {
      [this.questions.hasPhyHealthNeeds.question]: sentenceCase(this.body.hasPhyHealthNeeds),
      [this.questions.hasPhyHealthNeeds.needsDetail.question]: this.body.needsDetail,
      [this.questions.hasPhyHealthNeeds.canClimbStairs.question]: sentenceCase(this.body.canClimbStairs),

      [this.questions.isReceivingTreatment.question]: sentenceCase(this.body.isReceivingTreatment),
      [this.questions.isReceivingTreatment.treatmentDetail.question]: this.body.treatmentDetail,

      [this.questions.hasPhyHealthMedication.question]: sentenceCase(this.body.hasPhyHealthMedication),
      [this.questions.hasPhyHealthMedication.medicationDetail.question]: this.body.medicationDetail,

      [this.questions.canLiveIndependently.question]: sentenceCase(this.body.canLiveIndependently),
      [this.questions.canLiveIndependently.indyLivingDetail.question]: this.body.indyLivingDetail,

      [this.questions.requiresAdditionalSupport.question]: sentenceCase(this.body.requiresAdditionalSupport),
      [this.questions.requiresAdditionalSupport.addSupportDetail.question]: this.body.addSupportDetail,
    }

    return response
  }
}
