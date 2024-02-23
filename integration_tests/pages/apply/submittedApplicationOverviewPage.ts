import { Cas2Application as Application, FullPerson } from '@approved-premises/api'
import Page from '../page'
import paths from '../../../server/paths/apply'

export default class SubmittedApplicationOverviewPage extends Page {
  constructor(private readonly application: Application) {
    const person = application.person as FullPerson
    super(person.name, person.name)
  }

  static visit(application: Application): void {
    cy.visit(paths.applications.overview({ id: application.id }))
  }

  addANote = (): void => {
    this.getTextInputByIdAndEnterDetails('note', 'some notes')
    cy.get('button').click()
  }

  shouldShowErrorMessage(): void {
    cy.get('.govuk-error-summary').should('contain', 'Enter a note for the assessor')
    cy.get('form').should('contain', 'Enter a note for the assessor')
  }
}
