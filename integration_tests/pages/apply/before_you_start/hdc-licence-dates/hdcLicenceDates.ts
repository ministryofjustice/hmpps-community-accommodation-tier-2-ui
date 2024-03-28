import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import { StructuredDate } from '../../../../../server/utils/dateUtils'

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

  completeForm(hdcEligibilityDate: string, conditionalReleaseDate: string): void {
    this.completeDateInputs('hdcEligibilityDate', hdcEligibilityDate)
    this.completeDateInputs('conditionalReleaseDate', conditionalReleaseDate)
  }

  shouldShowPrepopulatedDates(hdcEligibilityDate: StructuredDate, conditionalReleaseDate: StructuredDate): void {
    cy.get('#hdcEligibilityDate-day').should('have.value', hdcEligibilityDate.day)
    cy.get('#hdcEligibilityDate-month').should('have.value', hdcEligibilityDate.month)
    cy.get('#hdcEligibilityDate-year').should('have.value', hdcEligibilityDate.year)
    cy.get('#conditionalReleaseDate-day').should('have.value', conditionalReleaseDate.day)
    cy.get('#conditionalReleaseDate-month').should('have.value', conditionalReleaseDate.month)
    cy.get('#conditionalReleaseDate-year').should('have.value', conditionalReleaseDate.year)
  }
}
