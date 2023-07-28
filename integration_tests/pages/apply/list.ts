import Page from '../page'
import paths from '../../../server/paths/apply'
import { Cas2Application as Application, Cas2ApplicationSummary } from '../../../server/@types/shared'

export default class ListPage extends Page {
  constructor(private readonly inProgressApplications: Array<Cas2ApplicationSummary>) {
    super('Short-Term Accommodation (CAS-2) applications')
  }

  static visit(inProgressApplications: Array<Cas2ApplicationSummary>): ListPage {
    cy.visit(paths.applications.index.pattern)

    return new ListPage(inProgressApplications)
  }

  shouldShowInProgressApplications(): void {
    this.shouldShowApplications(this.inProgressApplications)
  }

  clickApplication(application: Application) {
    cy.get(`a[data-cy-id="${application.id}"]`).click()
  }

  private shouldShowApplications(applications: Array<Cas2ApplicationSummary>): void {
    applications.forEach(application => {
      cy.contains(application.person.name)
        .should('have.attr', 'href', paths.applications.show({ id: application.id }))
        .parent()
        .parent()
        .within(() => {
          cy.get('th').eq(0).contains(application.person.name)
        })
    })
  }
}
