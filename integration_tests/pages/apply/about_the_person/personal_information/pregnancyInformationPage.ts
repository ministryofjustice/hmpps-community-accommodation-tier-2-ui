import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class PregnancyInformationPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Is ${nameOrPlaceholderCopy(application.person)} pregnant?`,
      application,
      'personal-information',
      'pregnancy-information',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'personal-information',
        page: 'pregnancy-information',
      }),
    )
  }

  completeForm(): void {
    this.checkRadioByNameAndValue('isPregnant', 'yes')
    this.completeDateInputs('dueDate', '2023-07-15')
  }
}
