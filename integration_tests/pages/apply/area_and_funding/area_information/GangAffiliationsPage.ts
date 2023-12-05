import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class GangAffiliationsPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Does ${nameOrPlaceholderCopy(application.person)} have any gang affiliations?`,
      application,
      'area-information',
      'gang-affiliations',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'area-information',
        page: 'gang-affiliations',
      }),
    )
  }

  completeForm(): void {
    this.checkRadioByNameAndValue('hasGangAffiliations', 'yes')
    this.getTextInputByIdAndEnterDetails('gangName', 'Gang name')
    this.getTextInputByIdAndEnterDetails('gangOperationArea', 'Derby')
  }
}
