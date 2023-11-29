import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class FamilyAccommodationPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Family accommodation for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'area-information',
      'family-accommodation',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'area-information',
        page: 'family-accommodation',
      }),
    )
  }
}
