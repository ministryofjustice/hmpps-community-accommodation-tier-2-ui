import { Cas2Application as Application } from '../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../applyPage'
import paths from '../../../../server/paths/apply'
import { pageIsActiveInNavigation } from './utils'

export default class SubstanceMisusePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(`Health needs for ${application.person.name}`, application, 'health-needs', 'substance-misuse')

    pageIsActiveInNavigation('Substance misuse')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'health-needs',
        page: 'substance-misuse',
      }),
    )
  }

  describeIllegalSubstanceUse = (): void => {
    this.checkRadioByNameAndValue('usesIllegalSubstances', 'yes')
    this.getTextInputByIdAndEnterDetails('substanceMisuseHistory', 'Heroin user')
    this.getTextInputByIdAndEnterDetails('substanceMisuseDetail', 'Injects daily')
  }

  nameDrugAndAlcoholService = (): void => {
    this.checkRadioByNameAndValue('engagedWithDrugAndAlcoholService', 'yes')
    this.getTextInputByIdAndEnterDetails('drugAndAlcoholServiceDetail', 'The Drugs Project')
  }

  provideSubstituteMedicationDetails = (): void => {
    this.checkRadioByNameAndValue('requiresSubstituteMedication', 'yes')
    this.getTextInputByIdAndEnterDetails('substituteMedicationDetail', 'Methadone')
  }
}
