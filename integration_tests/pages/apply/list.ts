import Page from '../page'
import paths from '../../../server/paths/apply'
import { Cas2Application as Application, Cas2ApplicationSummary } from '../../../server/@types/shared'

export default class ListPage extends Page {
  constructor(
    private readonly applications: Array<Cas2ApplicationSummary>,
    name: string,
  ) {
    super('Short-Term Accommodation (CAS-2) applications', name)
  }

  static visit(applications: Array<Cas2ApplicationSummary>): ListPage {
    cy.visit(paths.applications.index.pattern)

    return new ListPage(applications, applications[0]?.personName)
  }

  shouldShowInProgressApplications(): void {
    this.shouldShowApplications(this.applications, true)
  }

  shouldShowSubmittedApplications(): void {
    cy.get('a').contains('Submitted').click()
    this.shouldShowApplications(this.applications)
  }

  shouldShowPrisonTab(): void {
    cy.contains(`Your prison's applications`).should('have.attr', 'href', paths.applications.prison.pattern)
  }

  clickApplication(application: Application) {
    cy.get(`a[data-cy-id="${application.id}"]`).click()
  }

  private shouldShowApplications(applications: Array<Cas2ApplicationSummary>, inProgress = false): void {
    applications.forEach(application => {
      const { personName } = application
      cy.contains(personName)
        .should(
          'have.attr',
          'href',
          inProgress
            ? paths.applications.show({ id: application.id })
            : paths.applications.overview({ id: application.id }),
        )
        .parent()
        .parent()
        .within(() => {
          cy.get('th').eq(0).contains(personName)
        })
    })
  }
}
