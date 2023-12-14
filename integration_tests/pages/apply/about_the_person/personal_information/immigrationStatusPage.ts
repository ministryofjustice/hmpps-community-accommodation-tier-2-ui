import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class ImmigrationStatusPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `What is ${nameOrPlaceholderCopy(application.person)}'s immigration status?`,
      application,
      'personal-information',
      'immigration-status',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'personal-information',
        page: 'immigration-status',
      }),
    )
  }

  completeForm(): void {
    this.getSelectInputByIdAndSelectAnEntry('immigrationStatus', 'UK citizen')
  }
}
