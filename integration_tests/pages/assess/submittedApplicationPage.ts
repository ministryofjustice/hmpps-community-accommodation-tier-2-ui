import { Cas2SubmittedApplication as SubmittedApplication, FullPerson } from '@approved-premises/api'
import Page from '../page'
import paths from '../../../server/paths/assess'

export default class SubmittedApplicationPage extends Page {
  constructor(private readonly application: SubmittedApplication) {
    const person = application.person as FullPerson
    super(`${person.name}'s application`, person.name)
  }

  static visit(application: SubmittedApplication): SubmittedApplicationPage {
    cy.visit(paths.submittedApplications.show({ id: application.id }))

    return new SubmittedApplicationPage(application)
  }

  hasExpectedSummaryData(): void {
    const person = this.application.person as FullPerson

    cy.get('#application-summary').within(() => {
      cy.get('span').contains(person.nomsNumber)
      cy.get('li').contains(this.application.submittedBy.name)
      cy.get('li').contains(person.prisonName)
      cy.get('li').contains(this.application.submittedBy.email)
      cy.get('li').contains(this.application.telephoneNumber)
      cy.get('li').contains(this.application.id)
    })
  }

  hasUpdateStatusButton(): void {
    cy.get('a').contains('Update application status')
  }
}
