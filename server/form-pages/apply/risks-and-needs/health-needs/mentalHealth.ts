import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type MentalHealthBody = {
  hasMentalHealthNeeds: YesOrNo
  needsDetail: string
  isEngagedWithCommunity: YesOrNo
  servicesDetail: string
  isEngagedWithServicesInCustody: YesOrNo
  canManageMedication: YesOrNo | 'notPrescribedMedication'
  canManageMedicationNotes: string
  medicationIssues: string
  cantManageMedicationNotes: string
}

@Page({
  name: 'mental-health',
  bodyProperties: [
    'hasMentalHealthNeeds',
    'needsDetail',
    'isEngagedWithCommunity',
    'servicesDetail',
    'isEngagedWithServicesInCustody',
    'canManageMedication',
    'canManageMedicationNotes',
    'medicationIssues',
    'cantManageMedicationNotes',
  ],
})
export default class MentalHealth implements TaskListPage {
  documentTitle = 'Mental health needs for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Mental health needs for ${this.personName}`

  questions = getQuestions(this.personName)['health-needs']['mental-health']

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

    if (!this.body.isEngagedWithServicesInCustody) {
      errors.isEngagedWithServicesInCustody = 'Confirm whether they are engaged with mental health services in custody'
    }

    if (!this.body.canManageMedication) {
      errors.canManageMedication =
        "Confirm whether they can manage their own mental health medication on release, or select 'They are not prescribed medication for their mental health'"
    }

    if (this.body.canManageMedication === 'no' && !this.body.medicationIssues) {
      errors.medicationIssues = "Describe the applicant's issues with taking their mental health medication"
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasMentalHealthNeeds !== 'yes') {
      delete this.body.needsDetail
    }

    if (this.body.isEngagedWithCommunity !== 'yes') {
      delete this.body.servicesDetail
    }

    if (this.body.canManageMedication !== 'yes') {
      delete this.body.canManageMedicationNotes
    }

    if (this.body.canManageMedication !== 'no') {
      delete this.body.medicationIssues
      delete this.body.cantManageMedicationNotes
    }
  }
}
