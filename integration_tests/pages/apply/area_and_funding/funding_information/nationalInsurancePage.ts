import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class NationalInsurancePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `What is ${nameOrPlaceholderCopy(application.person)}'s National Insurance number? (Optional)`,
      application,
      'funding-information',
      'national-insurance',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'funding-information',
        page: 'national-insurance',
      }),
    )
  }
}
