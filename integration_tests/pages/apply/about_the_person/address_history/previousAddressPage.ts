import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class PreviousAddressPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Did ${nameOrPlaceholderCopy(application.person)} have an address before entering custody?`,
      application,
      'address-history',
      'previous-address',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'address-history',
        page: 'previous-address',
      }),
    )
  }

  addKnownAddressInformation(): void {
    this.getTextInputByIdAndEnterDetails('previousAddressLine1', 'Example Road')
    this.getTextInputByIdAndEnterDetails('previousTownOrCity', 'Some City')
    this.getTextInputByIdAndEnterDetails('previousPostcode', 'AB1 2CD')
  }

  addLastKnownAddressInformation(): void {
    this.getTextInputByIdAndEnterDetails('howLong', '6 months')
    this.getTextInputByIdAndEnterDetails('lastKnownAddressLine1', 'Example Road')
    this.getTextInputByIdAndEnterDetails('lastKnownTownOrCity', 'Some City')
    this.getTextInputByIdAndEnterDetails('lastKnownPostcode', 'AB1 2CD')
  }
}
