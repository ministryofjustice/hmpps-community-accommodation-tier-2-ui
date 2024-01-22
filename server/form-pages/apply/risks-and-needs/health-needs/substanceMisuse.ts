import type { TaskListErrors, YesNoOrDontKnow, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type SubstanceMisuseBody = {
  usesIllegalSubstances: YesOrNo
  substanceMisuse: string
  pastSubstanceMisuse: YesOrNo
  pastSubstanceMisuseDetail: string
  engagedWithDrugAndAlcoholService: YesOrNo
  intentToReferToServiceOnRelease: YesOrNo
  drugAndAlcoholServiceDetail: string
  requiresSubstituteMedication: YesOrNo
  substituteMedicationDetail: string
  releasedWithNaloxone: YesNoOrDontKnow
}

@Page({
  name: 'substance-misuse',
  bodyProperties: [
    'usesIllegalSubstances',
    'substanceMisuse',
    'pastSubstanceMisuse',
    'pastSubstanceMisuseDetail',
    'engagedWithDrugAndAlcoholService',
    'intentToReferToServiceOnRelease',
    'drugAndAlcoholServiceDetail',
    'requiresSubstituteMedication',
    'substituteMedicationDetail',
    'releasedWithNaloxone',
  ],
})
export default class SubstanceMisuse implements TaskListPage {
  documentTitle = 'Substance misuse needs for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Substance misuse needs for ${nameOrPlaceholderCopy(this.application.person)}`

  questions = getQuestions(this.personName)['health-needs']['substance-misuse']

  body: SubstanceMisuseBody

  constructor(
    body: Partial<SubstanceMisuseBody>,
    private readonly application: Application,
  ) {
    this.body = body as SubstanceMisuseBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'physical-health'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.usesIllegalSubstances) {
      errors.usesIllegalSubstances = `Confirm whether they take any illegal substances`
    }

    if (this.body.usesIllegalSubstances === 'yes' && !this.body.substanceMisuse) {
      errors.substanceMisuse = 'Name the illegal substances they take'
    }

    if (!this.body.pastSubstanceMisuse) {
      errors.pastSubstanceMisuse = 'Confirm whether they had past issues with substance misuse'
    }

    if (this.body.pastSubstanceMisuse === 'yes' && !this.body.pastSubstanceMisuseDetail) {
      errors.pastSubstanceMisuseDetail = 'Provide details of their past issues with substance misuse'
    }

    if (!this.body.engagedWithDrugAndAlcoholService) {
      errors.engagedWithDrugAndAlcoholService = `Confirm whether they are engaged with a drug and alcohol service`
    }

    if (!this.body.intentToReferToServiceOnRelease) {
      errors.intentToReferToServiceOnRelease =
        'Confirm whether they will be referred to a drug and alcohol service after release'
    }

    if (!this.body.requiresSubstituteMedication) {
      errors.requiresSubstituteMedication = `Confirm whether they require substitute medication`
    }

    if (this.body.requiresSubstituteMedication === 'yes' && !this.body.substituteMedicationDetail) {
      errors.substituteMedicationDetail = 'Provide details of their substitute medication'
    }

    if (!this.body.releasedWithNaloxone) {
      errors.releasedWithNaloxone = "Confirm whether they will be released with naloxone or select 'I don’t know'"
    }

    return errors
  }

  onSave(): void {
    if (this.body.usesIllegalSubstances !== 'yes') {
      delete this.body.substanceMisuse
    }

    if (this.body.pastSubstanceMisuse !== 'yes') {
      delete this.body.pastSubstanceMisuseDetail
    }

    if (this.body.intentToReferToServiceOnRelease !== 'yes') {
      delete this.body.drugAndAlcoholServiceDetail
    }

    if (this.body.requiresSubstituteMedication !== 'yes') {
      delete this.body.substituteMedicationDetail
    }
  }
}
