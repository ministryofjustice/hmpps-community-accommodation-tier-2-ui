import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { pageIsActiveInNavigation, pageHasLinkToGuidance } from '../utils'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class SubstanceMisusePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Substance misuse needs for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'health-needs',
      'substance-misuse',
    )
    pageHasLinkToGuidance()
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

    cy.get(`label[for="substanceMisuseHistory"]`).contains('What substances do they take?')
    this.getTextInputByIdAndEnterDetails('substanceMisuseHistory', 'Heroin user')
  }

  nameDrugAndAlcoholService = (): void => {
    this.checkRadioByNameAndValue('engagedWithDrugAndAlcoholService', 'yes')
    this.checkRadioByNameAndValue('intentToReferToServiceOnRelease', 'yes')
    cy.get(`label[for="drugAndAlcoholServiceDetail"]`).contains('Name the drug and alcohol service')
    this.getTextInputByIdAndEnterDetails('drugAndAlcoholServiceDetail', 'The Drugs Project')
  }

  provideSubstituteMedicationDetails = (): void => {
    this.checkRadioByNameAndValue('requiresSubstituteMedication', 'yes')
    cy.get(`label[for="substituteMedicationDetail"]`).contains('What substitute medication do they take?')
    this.getTextInputByIdAndEnterDetails('substituteMedicationDetail', 'Methadone')
  }

  provideNaloxoneDetails = (): void => {
    this.checkRadioByNameAndValue('releasedWithNaloxone', 'yes')
  }
}
