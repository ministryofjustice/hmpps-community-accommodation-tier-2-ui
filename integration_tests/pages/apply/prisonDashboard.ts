import Page from '../page'
import paths from '../../../server/paths/apply'

export default class PrisonDashboardPage extends Page {
  constructor() {
    super(`Your prison's CAS2 HDC applications`, undefined)
  }

  static visit(): PrisonDashboardPage {
    cy.visit(paths.applications.prison.pattern)

    return new PrisonDashboardPage()
  }

  shouldShowMyApplicationsTab(): void {
    cy.contains(`Your applications`).should('have.attr', 'href', paths.applications.index.pattern)
  }

  clickPageNumber(pageNumber: string): void {
    const linkText = new RegExp(`^\\s+${pageNumber}\\s+$`)
    cy.get('a').contains(linkText).click()
  }
}
