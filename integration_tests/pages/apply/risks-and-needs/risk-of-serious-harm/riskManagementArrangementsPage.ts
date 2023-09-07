import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class RiskManagementArrangementsPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Risk management arrangements for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'risk-management-arrangements',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'risk-management-arrangements',
      }),
    )
  }
}
