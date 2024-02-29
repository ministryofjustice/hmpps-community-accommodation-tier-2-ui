import { Cas2SubmittedApplication as SubmittedApplication, FullPerson } from '@approved-premises/api'
import Page from '../page'

export default class SubmittedApplicationOverviewPage extends Page {
  constructor(private readonly application: SubmittedApplication) {
    const person = application.person as FullPerson
    super(person.name, person.name)
  }

  static visit(application: SubmittedApplication): SubmittedApplicationOverviewPage {
    cy.visit(`/assess/applications/${application.id}/overview`)
    return new SubmittedApplicationOverviewPage(application)
  }

  addANote = (): void => {
    this.getTextInputByIdAndEnterDetails('note', 'some notes')
    cy.get('button').contains('Submit').click()
  }

  shouldShowErrorMessage(): void {
    cy.get('.govuk-error-summary').should('contain', 'Enter a note for the referrer')
    cy.get('form').should('contain', 'Enter a note for the referrer')
  }

  shouldShowPrintButtonInActionsMenu() {
    cy.get('.moj-button-menu').click()
    cy.contains('.moj-button-menu__item', 'Download as a PDF')
  }
}
