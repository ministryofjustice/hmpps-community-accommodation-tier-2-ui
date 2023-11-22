import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class SecondPreferredAreaPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Second preferred area for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'area-information',
      'second-preferred-area',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'area-information',
        page: 'second-preferred-area',
      }),
    )
  }
}
