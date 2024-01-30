import Page from '../page'
import paths from '../../../server/paths/apply'
import { Cas2Application, FullPerson } from '../../../server/@types/shared'

export default class SubmissionPage extends Page {
  constructor(
    private readonly application: Cas2Application,
    name: string,
  ) {
    super(`${name}'s application`, name)
  }

  static visit(application: Cas2Application): SubmissionPage {
    cy.visit(paths.applications.show({ id: application.id }))

    const person = application.person as FullPerson

    return new SubmissionPage(application, person?.name)
  }

  hasExpectedSummaryData(): void {
    const person = this.application.person as FullPerson

    cy.get('#application-summary').within(() => {
      cy.get('span').contains(person.nomsNumber)
      cy.get('li').contains(this.application.createdBy.name)
      cy.get('li').contains(person.prisonName)
      cy.get('li').contains(this.application.createdBy.email)
      cy.get('li').contains(this.application.telephoneNumber)
      cy.get('li').contains(this.application.id)
    })
  }

  doesNotHaveUpdateStatusButton(): void {
    cy.get('a').contains('Update application status').should('not.exist')
  }
}
