import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

type SubstanceMisuseBody = {
  usesIllegalSubstances: YesOrNo
  substanceMisuseHistory: string
  substanceMisuseDetail: string
  engagedWithDrugAndAlcoholService: YesOrNo
  drugAndAlcoholServiceDetail: string
  requiresSubstituteMedication: YesOrNo
  substituteMedicationDetail: string
}

@Page({
  name: 'substance-misuse',
  bodyProperties: [
    'usesIllegalSubstances',
    'substanceMisuseHistory',
    'substanceMisuseDetail',
    'engagedWithDrugAndAlcoholService',
    'drugAndAlcoholServiceDetail',
    'requiresSubstituteMedication',
    'substituteMedicationDetail',
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

    if (this.body.usesIllegalSubstances === 'yes' && !this.body.substanceMisuseHistory) {
      errors.substanceMisuseHistory = 'Name the illegal substances they take'
    }

    if (this.body.usesIllegalSubstances === 'yes' && !this.body.substanceMisuseDetail) {
      errors.substanceMisuseDetail = 'Describe how often they take substances, by what method and how much'
    }

    if (!this.body.engagedWithDrugAndAlcoholService) {
      errors.engagedWithDrugAndAlcoholService = `Confirm whether they are engaged with a drug and alcohol service`
    }

    if (this.body.engagedWithDrugAndAlcoholService === 'yes' && !this.body.drugAndAlcoholServiceDetail) {
      errors.drugAndAlcoholServiceDetail = 'Provide the name of the drug and alcohol service'
    }

    if (!this.body.requiresSubstituteMedication) {
      errors.requiresSubstituteMedication = `Confirm whether they require substitute medication`
    }

    if (this.body.requiresSubstituteMedication === 'yes' && !this.body.substituteMedicationDetail) {
      errors.substituteMedicationDetail = 'Provide details of their substitute medication'
    }

    return errors
  }
}
