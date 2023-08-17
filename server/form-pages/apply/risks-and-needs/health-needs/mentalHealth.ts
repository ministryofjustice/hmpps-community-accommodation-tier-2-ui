import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import { sentenceCase } from '../../../../utils/utils'
import TaskListPage from '../../../taskListPage'

type MentalHealthBody = {
  hasMentalHealthNeeds: YesOrNo
  needsDetail: string
  isEngagedWithCommunity: YesOrNo
  servicesDetail: string
  hasPrescribedMedication: YesOrNo
  isInPossessionOfMeds: YesOrNo
  medicationDetail: string
  medicationIssues: string
}

@Page({
  name: 'mental-health',
  bodyProperties: [
    'hasMentalHealthNeeds',
    'needsDetail',
    'isEngagedWithCommunity',
    'servicesDetail',
    'hasPrescribedMedication',
    'isInPossessionOfMeds',
    'medicationDetail',
    'medicationIssues',
  ],
})
export default class MentalHealth implements TaskListPage {
  title = `Mental health needs for ${this.application.person.name}`

  questions = {
    hasMentalHealthNeeds: {
      question: 'Do they have any mental health needs?',
      needsDetail: {
        question: 'Please describe their mental health needs.',
      },
    },
    isEngagedWithCommunity: {
      question: 'Are they engaged with any community mental health services?',
      servicesDetail: {
        question: 'Please state which services.',
      },
    },
    hasPrescribedMedication: {
      question: 'Are they prescribed any medication for their mental health?',
      isInPossessionOfMeds: {
        question: 'Are they in possession of their medication?',
      },
      medicationDetail: {
        question: 'Please list any medications.',
      },
      medicationIssues: {
        question: 'Please list any issues they have with taking their medication',
        optional: true,
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

    if (!this.body.hasMentalHealthNeeds) {
      errors.hasMentalHealthNeeds = 'Confirm whether they have mental health needs'
    }
    if (this.body.hasMentalHealthNeeds === 'yes' && !this.body.needsDetail) {
      errors.needsDetail = 'Describe mental health needs'
    }

    if (!this.body.isEngagedWithCommunity) {
      errors.isEngagedWithCommunity = 'Confirm whether they are engaged with services'
    }
    if (this.body.isEngagedWithCommunity === 'yes' && !this.body.servicesDetail) {
      errors.servicesDetail = 'State the services with which they have engaged'
    }

    if (!this.body.hasPrescribedMedication) {
      errors.hasPrescribedMedication = 'Confirm whether they are prescribed medication'
    }

    if (this.body.hasPrescribedMedication === 'yes') {
      if (!this.body.isInPossessionOfMeds) {
        errors.isInPossessionOfMeds = 'Confirm whether they have their medication'
      }

      if (!this.body.medicationDetail) {
        errors.medicationDetail = 'List their mental health medication'
      }
    }

    return errors
  }

  response() {
    const response = {
      [this.questions.hasMentalHealthNeeds.question]: sentenceCase(this.body.hasMentalHealthNeeds),
      [this.questions.hasMentalHealthNeeds.needsDetail.question]: this.body.needsDetail,

      [this.questions.isEngagedWithCommunity.question]: sentenceCase(this.body.isEngagedWithCommunity),
      [this.questions.isEngagedWithCommunity.servicesDetail.question]: this.body.servicesDetail,

      [this.questions.hasPrescribedMedication.question]: sentenceCase(this.body.hasPrescribedMedication),
      [this.questions.hasPrescribedMedication.isInPossessionOfMeds.question]: sentenceCase(
        this.body.isInPossessionOfMeds,
      ),
      [this.questions.hasPrescribedMedication.medicationDetail.question]: this.body.medicationDetail,
      [this.questions.hasPrescribedMedication.medicationIssues.question]: this.body.medicationIssues,
    }

    return response
  }
}
