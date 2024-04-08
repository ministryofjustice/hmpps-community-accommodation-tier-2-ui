import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class OffenceHistoryPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Offence history for ${nameOrPlaceholderCopy(application.person, 'The person')}`,
      application,
      'offending-history',
      'offence-history',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'offending-history',
        page: 'offence-history',
      }),
    )
  }

  hasListOfOffences(): void {
    cy.get('.govuk-table__header').contains('Arson')
    cy.get('.govuk-table__cell').contains('Arson')
    cy.get('.govuk-table__cell').contains('3')
  }

  hasNoOffences(): void {
    cy.get('.govuk-body').contains('No previous offences have been added.')
  }
}
