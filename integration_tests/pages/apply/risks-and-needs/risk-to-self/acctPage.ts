import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'

export default class AcctPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super('Assessment, Care in Custody and Teamwork (ACCT)', application, 'risk-to-self', 'acct')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-to-self',
        page: 'acct',
      }),
    )
  }

  hasListOfAccts(): void {
    cy.get('.govuk-summary-card__title').contains('HMPPS prison')
    cy.get('.govuk-summary-list').contains('01/02/2012')
    cy.get('.govuk-summary-list').contains('10/10/2013')
    cy.get('.govuk-summary-list').contains('ACCT details')
  }

  hasNoAccts(): void {
    cy.get('.govuk-body').contains('No ACCT notes have been added.')
  }

  clickRemove(): void {
    cy.get('a').contains('Remove').click()
  }
}
