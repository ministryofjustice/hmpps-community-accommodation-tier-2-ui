import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class HDCLicenceDates extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `${nameOrPlaceholderCopy(application.person, 'The person')}'s Home Detention Curfew (HDC) licence dates`,
      application,
      'hdc-licence-and-cpp-details',
      'hdc-licence-dates',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'hdc-licence-and-cpp-details',
        page: 'hdc-licence-dates',
      }),
    )
  }

  completeForm(): void {
    this.completeDateInputs('hdcEligibilityDate', '2022-07-15')
    this.completeDateInputs('conditionalReleaseDate', '2022-07-15')
  }

  shouldShowPrepopulatedDates(): void {
    cy.get('#hdcEligibilityDate-day').should('have.value', '28')
    cy.get('#hdcEligibilityDate-month').should('have.value', '2')
    cy.get('#hdcEligibilityDate-year').should('have.value', '2024')
    cy.get('#conditionalReleaseDate-day').should('have.value', '22')
    cy.get('#conditionalReleaseDate-month').should('have.value', '2')
    cy.get('#conditionalReleaseDate-year').should('have.value', '2024')
  }
}
