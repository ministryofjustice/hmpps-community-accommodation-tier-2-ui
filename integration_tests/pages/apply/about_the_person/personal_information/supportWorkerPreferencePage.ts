import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class SupportWorkerPreferencePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Does ${nameOrPlaceholderCopy(application.person)} have a gender preference for their support worker?`,
      application,
      'personal-information',
      'support-worker-preference',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'personal-information',
        page: 'support-worker-preference',
      }),
    )
  }

  completeForm(): void {
    this.checkRadioByNameAndValue('hasSupportWorkerPreference', 'yes')
    this.checkRadioByNameAndValue('supportWorkerPreference', 'female')
  }
}
