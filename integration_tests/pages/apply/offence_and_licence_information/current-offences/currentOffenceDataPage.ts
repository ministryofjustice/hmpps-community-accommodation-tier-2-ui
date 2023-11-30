import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class CurrentOffenceDataPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Add ${nameOrPlaceholderCopy(application.person)}'s current offence details`,
      application,
      'current-offences',
      'current-offence-data',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'current-offences',
        page: 'current-offence-data',
      }),
    )
  }

  addOffenceInformation(): void {
    this.getTextInputByIdAndEnterDetails('titleAndNumber', 'Arson (01000)')
    this.getSelectInputByIdAndSelectAnEntry('offenceCategory', 'Arson')
    this.completeDateInputs('offenceDate', '2022-07-15')
    this.getTextInputByIdAndEnterDetails('sentenceLength', '6 months')
    this.getTextInputByIdAndEnterDetails('summary', 'some detail')
    this.checkRadioByNameAndValue('outstandingCharges', 'yes')
    this.getTextInputByIdAndEnterDetails('outstandingChargesDetail', 'some other detail')
  }

  clickSubmit(): void {
    cy.get('button').contains('Save and continue').click()
  }

  clickAddAnother(): void {
    cy.get('button').contains('Save and add another').click()
  }

  assertFormisEmpty(): void {
    cy.get('#titleAndNumber').should('have.value', '')
    cy.get('#offenceCategory').should('have.value', 'choose')
    cy.get('#offenceDate-day').should('have.value', '')
    cy.get('#summary').should('have.value', '')
    cy.get('#outstandingCharges').should('not.be.checked')
    cy.get('#outstandingChargesDetail').should('have.value', '')
  }
}
