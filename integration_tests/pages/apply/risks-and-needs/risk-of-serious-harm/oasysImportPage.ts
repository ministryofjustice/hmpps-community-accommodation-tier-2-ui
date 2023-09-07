import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class OasysImportPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Import ${nameOrPlaceholderCopy(application.person)}'s risk of serious harm (RoSH) data from OASys`,
      application,
      'risk-of-serious-harm',
      'oasys-import',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'oasys-import',
      }),
    )
  }
}
