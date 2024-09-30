import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class WhoIsAtRiskPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `People at risk from ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'risk-to-others',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'who-is-at-risk',
      }),
    )
  }

  shouldContainRoshSummaryLink = () => {
    cy.get('a')
      .contains('View RoSH summary')
      .should('have.attr', 'href', '/applications/abc123/tasks/risk-of-serious-harm/pages/summary')
  }
}
