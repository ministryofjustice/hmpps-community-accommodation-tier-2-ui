import { Cas2Application as Application, FullPerson } from '@approved-premises/api'
import Page from '../page'

export default class ApplicationSubmittedPage extends Page {
  constructor(private readonly application: Application) {
    const person = application.person as FullPerson
    super('Application complete', person.name)
  }

  shouldShowApplicationDetails(): void {
    const person = this.application.person as FullPerson

    cy.get('.govuk-list--spaced').within(() => {
      cy.get('li').contains(this.application.id)
      cy.get('li').contains(person.name)
      cy.get('li').contains(person.nomsNumber)
    })
  }
}
