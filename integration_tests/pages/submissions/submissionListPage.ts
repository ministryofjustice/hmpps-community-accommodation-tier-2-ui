import Page from '../page'
import paths from '../../../server/paths/assess'
import { Cas2SubmittedApplication, FullPerson } from '../../../server/@types/shared'
import { nameOrPlaceholderCopy } from '../../../server/utils/utils'

export default class SubmissionListPage extends Page {
  constructor(
    private readonly applications: Array<Cas2SubmittedApplication>,
    name: string,
  ) {
    super('Short-Term Accommodation (CAS-2) applications', name)
  }

  static visit(applications: Array<Cas2SubmittedApplication>): SubmissionListPage {
    cy.visit(paths.submittedApplications.index.pattern)

    const person = applications[0]?.person as FullPerson

    return new SubmissionListPage(applications, person?.name)
  }

  shouldShowSubmittedApplications(applications: Array<Cas2SubmittedApplication>): void {
    this.shouldShowApplications(applications)
  }

  private shouldShowApplications(applications: Array<Cas2SubmittedApplication>): void {
    applications.forEach(application => {
      const personName = nameOrPlaceholderCopy(application.person)
      cy.contains(personName)
        .should('have.attr', 'href', paths.submittedApplications.show({ id: application.id }))
        .parent()
        .parent()
        .within(() => {
          cy.get('th').eq(0).contains(personName)
        })
    })
  }
}