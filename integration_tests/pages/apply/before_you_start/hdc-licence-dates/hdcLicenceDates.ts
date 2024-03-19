import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import { getTodaysDatePlusMonths } from '../../../../../server/utils/dateUtils'

export default class HDCLicenceDates extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `${nameOrPlaceholderCopy(application.person, 'The person')}'s Home Detention Curfew (HDC) licence dates`,
      application,
      'hdc-licence-dates',
      'hdc-licence-dates',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'hdc-licence-dates',
        page: 'hdc-licence-dates',
      }),
    )
  }

  completeForm(): void {
    this.completeDateInputs('hdcEligibilityDate', getTodaysDatePlusMonths().formattedDate)
    this.completeDateInputs('conditionalReleaseDate', getTodaysDatePlusMonths(2).formattedDate)
  }

  shouldShowPrepopulatedDates(): void {
    cy.get('#hdcEligibilityDate-day').should('have.value', '22')
    cy.get('#hdcEligibilityDate-month').should('have.value', '2')
    cy.get('#hdcEligibilityDate-year').should('have.value', '2024')
    cy.get('#conditionalReleaseDate-day').should('have.value', '28')
    cy.get('#conditionalReleaseDate-month').should('have.value', '3')
    cy.get('#conditionalReleaseDate-year').should('have.value', '2024')
  }
}
