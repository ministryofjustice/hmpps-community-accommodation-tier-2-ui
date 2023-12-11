import {
  Cas2Application as Application,
  Cas2Application,
} from '../../../../../server/@types/shared/models/Cas2Application'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import ApplyPage from '../../applyPage'

export default class ConfirmConsentPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Confirm ${nameOrPlaceholderCopy(application.person)}'s consent to apply for Short-Term Accommodation (CAS-2)`,
      application,
      'confirm-consent',
      'confirm-consent',
    )
  }

  static visit = (application: Cas2Application) => {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'confirm-consent',
        page: 'confirm-consent',
      }),
    )
  }

  completeFormWithConsent(): void {
    this.checkRadioByNameAndValue('hasGivenConsent', 'yes')
    this.getTextInputByIdAndEnterDetails('consentDate-day', '1')
    this.getTextInputByIdAndEnterDetails('consentDate-month', '1')
    this.getTextInputByIdAndEnterDetails('consentDate-year', '2023')
  }

  completeFormWithoutConsent(): void {
    this.checkRadioByNameAndValue('hasGivenConsent', 'no')
    this.getTextInputByIdAndEnterDetails('consentRefusalDetail', 'some reasons')
  }
}
