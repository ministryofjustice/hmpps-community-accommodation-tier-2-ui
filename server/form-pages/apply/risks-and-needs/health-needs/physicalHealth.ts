import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type PhysicalHealthBody = {
  hasPhyHealthNeeds: YesOrNo
  needsDetail: string
  canClimbStairs: YesOrNo
  isReceivingMedicationOrTreatment: YesOrNo
  medicationOrTreatmentDetail: string
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
    'isReceivingMedicationOrTreatment',
    'medicationOrTreatmentDetail',
    'canLiveIndependently',
    'indyLivingDetail',
    'requiresAdditionalSupport',
    'addSupportDetail',
  ],
})
export default class PhysicalHealth implements TaskListPage {
  documentTitle = 'Physical health needs for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Physical health needs for ${this.personName}`

  questions = getQuestions(this.personName)['health-needs']['physical-health']

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

    if (!this.body.hasPhyHealthNeeds) {
      errors.hasPhyHealthNeeds = 'Confirm whether they have physical health needs'
    }

    if (this.body.hasPhyHealthNeeds === 'yes') {
      if (!this.body.needsDetail) {
        errors.needsDetail = 'Describe physical health needs'
      }

      if (!this.body.canClimbStairs) {
        errors.canClimbStairs = 'Confirm whether they can climb stairs'
      }
    }

    if (!this.body.isReceivingMedicationOrTreatment) {
      errors.isReceivingMedicationOrTreatment =
        'Confirm whether they are currently receiving any medication or treatment'
    }

    if (this.body.isReceivingMedicationOrTreatment === 'yes' && !this.body.medicationOrTreatmentDetail) {
      errors.medicationOrTreatmentDetail = 'Describe the medication or treatment'
    }

    if (!this.body.canLiveIndependently) {
      errors.canLiveIndependently = 'Confirm whether they can live independently'
    }

    if (this.body.canLiveIndependently === 'no' && !this.body.indyLivingDetail) {
      errors.indyLivingDetail = 'Describe why they are unable to live independently'
    }

    if (!this.body.requiresAdditionalSupport) {
      errors.requiresAdditionalSupport = 'Confirm whether they require additional support'
    }

    if (this.body.requiresAdditionalSupport === 'yes' && !this.body.addSupportDetail) {
      errors.addSupportDetail = 'Describe the support required'
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasPhyHealthNeeds !== 'yes') {
      delete this.body.needsDetail
      delete this.body.canClimbStairs
    }

    if (this.body.isReceivingMedicationOrTreatment !== 'yes') {
      delete this.body.medicationOrTreatmentDetail
    }

    if (this.body.canLiveIndependently !== 'no') {
      delete this.body.indyLivingDetail
    }

    if (this.body.requiresAdditionalSupport !== 'yes') {
      delete this.body.addSupportDetail
    }
  }
}
