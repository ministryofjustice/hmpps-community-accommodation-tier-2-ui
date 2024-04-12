import Page from '../page'
import paths from '../../../server/paths/apply'

export default class PrisonDashboardPage extends Page {
  constructor() {
    super('Short-Term Accommodation (CAS-2) applications', undefined)
  }

  static visit(): PrisonDashboardPage {
    cy.visit(paths.applications.prison.pattern)

    return new PrisonDashboardPage()
  }

  shouldShowMyApplicationsTab(): void {
    cy.contains(`Your applications`).should('have.attr', 'href', paths.applications.index.pattern)
  }
}
