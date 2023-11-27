import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class CurrentOffencesPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Current offences for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'current-offences',
      'current-offences',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'current-offences',
        page: 'current-offences',
      }),
    )
  }

  hasListOfOffences(): void {
    cy.get('.govuk-summary-card__title').contains('Arson (09000)')
    cy.get('.govuk-summary-list').contains('summary detail')
    cy.get('.govuk-summary-list').contains('2 months')
    cy.get('.govuk-summary-list').contains('outstanding charges detail')
  }

  hasNoOffences(): void {
    cy.get('.govuk-body').contains('There are no current offences to show.')
  }

  shouldShowErrorSummary(): void {
    cy.get('.govuk-error-summary').should('contain', 'Current offences must be added to the application')
  }
}
