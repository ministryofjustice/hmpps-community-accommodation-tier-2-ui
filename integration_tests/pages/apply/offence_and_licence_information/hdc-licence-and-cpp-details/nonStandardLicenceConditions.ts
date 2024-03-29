import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class NonStandardLicenceConditionsPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Does ${nameOrPlaceholderCopy(application.person, 'The person')} have any non-standard licence conditions?`,
      application,
      'cpp-details-and-hdc-licence-conditions',
      'non-standard-licence-conditions',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'cpp-details-and-hdc-licence-conditions',
        page: 'non-standard-licence-conditions',
      }),
    )
  }

  completeForm(): void {
    this.checkRadioByNameAndValue('nonStandardLicenceConditions', 'yes')
    this.getTextInputByIdAndEnterDetails('nonStandardLicenceConditionsDetail', 'some details')
  }
}
