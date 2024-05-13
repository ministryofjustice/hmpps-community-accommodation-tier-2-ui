import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class AcctPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `${nameOrPlaceholderCopy(application.person, 'The person')}'s ACCT notes`,
      application,
      'risk-to-self',
      'acct',
    )
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
    cy.get('.govuk-summary-card__title').contains('1 February 2012 - 10 October 2013')
    cy.get('.govuk-summary-list').contains('HMPPS prison')
    cy.get('.govuk-summary-list').should('contain.html', 'ACCT details<br>some more details on another line')
  }

  hasNoAccts(): void {
    cy.get('.govuk-body').contains('No ACCT notes have been added.')
  }
}
