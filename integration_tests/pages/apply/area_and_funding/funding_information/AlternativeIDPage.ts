import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class AlternativeIdentificationPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `What alternative identification documentation (ID) does ${nameOrPlaceholderCopy(application.person)} have?`,
      application,
      'funding-information',
      'alternative-identification',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'funding-information',
        page: 'alternative-identification',
      }),
    )
  }
}
