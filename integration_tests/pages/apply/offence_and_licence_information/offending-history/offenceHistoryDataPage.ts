import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class OffenceHistoryDataPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Add a previous offence for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'offending-history',
      'offence-history-data',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'offending-history',
        page: 'offence-history-data',
      }),
    )
  }

  addOffenceInformation(): void {
    this.getTextInputByIdAndEnterDetails('offenceGroupName', 'Arson (01000)')
    this.getSelectInputByIdAndSelectAnEntry('offenceCategory', 'Arson')
    this.getTextInputByIdAndEnterDetails('numberOfOffences', '2')
    this.getTextInputByIdAndEnterDetails('sentenceTypes', '1 suspended')
    this.getTextInputByIdAndEnterDetails('summary', 'some detail')
  }

  clickSubmit(): void {
    cy.get('button').contains('Save and add offence').click()
  }

  clickAddAnother(): void {
    cy.get('button').contains('Save and add another').click()
  }

  assertFormisEmpty(): void {
    cy.get('#offenceGroupName').should('have.value', '')
    cy.get('#offenceCategory').should('have.value', 'choose')
    cy.get('#offenceDate-day').should('have.value', '')
    cy.get('#summary').should('have.value', '')
  }
}
