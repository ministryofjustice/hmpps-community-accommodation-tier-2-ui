import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class IdentificationPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `What identification documentation (ID) does ${nameOrPlaceholderCopy(application.person)} have?`,
      application,
      'funding-information',
      'identification',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'funding-information',
        page: 'identification',
      }),
    )
  }
}
