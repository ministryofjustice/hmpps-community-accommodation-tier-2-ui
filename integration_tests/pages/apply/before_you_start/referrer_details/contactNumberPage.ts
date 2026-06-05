import {
  Cas2HdcApplication as Application,
  Cas2HdcApplication,
} from '../../../../../server/@types/shared/models/Cas2HdcApplication'
import paths from '../../../../../server/paths/apply'
import ApplyPage from '../../applyPage'

export default class ContactNumberPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(`What is your contact telephone number?`, application, 'referrer-details', 'contact-number')
  }

  static visit = (application: Cas2HdcApplication) => {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'referrer-details',
        page: 'contact-number',
      }),
    )
  }

  completeForm(): void {
    this.getTextInputByIdAndEnterDetails('telephone', '123')
  }
}
