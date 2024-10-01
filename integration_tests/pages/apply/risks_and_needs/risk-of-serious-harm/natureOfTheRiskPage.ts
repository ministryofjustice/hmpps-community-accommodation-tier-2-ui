import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class NatureOfTheRiskPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Nature of the risk from ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'nature-of-the-risk',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'nature-of-the-risk',
      }),
    )
  }

  shouldContainRoshSummaryLink = () => {
    cy.get('a')
      .contains('View RoSH summary')
      .should('have.attr', 'href', '/applications/abc123/tasks/risk-of-serious-harm/pages/summary')
  }
}
