import Page from '../page'
import paths from '../../../server/paths/apply'
import { Cas2Application as Application, Cas2ApplicationSummary } from '../../../server/@types/shared'

export default class ListPage extends Page {
  constructor(
    private readonly applications: Array<Cas2ApplicationSummary>,
    name: string,
  ) {
    super('Your CAS-2 applications', name)
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
}
