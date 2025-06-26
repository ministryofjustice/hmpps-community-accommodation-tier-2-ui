import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class CurrentAndPreviousRiskPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `${nameOrPlaceholderCopy(application.person, 'The person')}'s current and previous risks`,
      application,
      'risk-to-self',
      'current-and-previous-risk',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-to-self',
        page: 'current-and-previous-risk',
      }),
    )
  }
}
