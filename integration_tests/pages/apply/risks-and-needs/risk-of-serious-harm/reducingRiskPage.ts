import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class ReducingRiskPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Reducing risk for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'reducing-risk',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'reducing-risk',
      }),
    )
  }
}
