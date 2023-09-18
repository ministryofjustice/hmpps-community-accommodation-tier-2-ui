import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class RiskManagementArrangementsPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Risk management arrangements for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'risk-management-arrangements',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'risk-management-arrangements',
      }),
    )
  }

  selectAllArrangements = (page: RiskManagementArrangementsPage) => {
    page.checkCheckboxByLabel('mappa')
    page.checkCheckboxByLabel('marac')
    page.checkCheckboxByLabel('iom')
  }

  completeAllArrangementDetails = (page: RiskManagementArrangementsPage) => {
    page.getTextInputByIdAndEnterDetails('mappaDetails', 'details of mappa')
    page.getTextInputByIdAndEnterDetails('maracDetails', 'details of marac')
    page.getTextInputByIdAndEnterDetails('iomDetails', 'details of iom')
  }

  expectArrangementsToBeUnselected = () => {
    cy.get(`input[value="mappa"]`).should('not.be.checked')
    cy.get(`input[value="marac"]`).should('not.be.checked')
    cy.get(`input[value="iom"]`).should('not.be.checked')
  }

  expectArrangementDetailsToBeEmpty = () => {
    cy.get('#mappaDetails').should('have.value', '')
    cy.get('#maracDetails').should('have.value', '')
    cy.get('#iomDetails').should('have.value', '')
  }

  toggleBetweenNoAndArrangements = (page: RiskManagementArrangementsPage) => {
    cy.get(`input[value="no"]`).should('be.checked')
    page.checkCheckboxByLabel('mappa')
    cy.get(`input[value="no"]`).should('not.be.checked')
    page.checkCheckboxByLabel('no')
    page.checkCheckboxByLabel('marac')
    cy.get(`input[value="no"]`).should('not.be.checked')
    page.checkCheckboxByLabel('no')
    page.checkCheckboxByLabel('iom')
    cy.get(`input[value="no"]`).should('not.be.checked')
  }
}
