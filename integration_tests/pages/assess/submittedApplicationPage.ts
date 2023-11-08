import { Cas2SubmittedApplication as SubmittedApplication, FullPerson } from '@approved-premises/api'
import Page from '../page'

export default class SubmittedApplicationPage extends Page {
  constructor(private readonly application: SubmittedApplication) {
    const person = application.person as FullPerson
    super('Application answers', person.name)
  }

  shouldShowPrintButton(): void {
    cy.get('button').contains('Save as PDF')
  }

  clickPrintButton(): void {
    cy.get('button').contains('Save as PDF').click()
  }

  shouldPrint(): void {
    cy.window().then(win => {
      cy.stub(win, 'print').as('printStub')
    })

    this.clickPrintButton()

    cy.get('@printStub').should('be.calledOnce')
  }

  hasExpectedSummaryData(): void {
    const person = this.application.person as FullPerson

    cy.get('#application-summary').within(() => {
      cy.get('li').contains(person.name)
      cy.get('li').contains(person.nomsNumber)
      cy.get('li').contains(this.application.submittedBy.name)
      cy.get('li').contains(this.application.submittedBy.email)
    })
  }
}
