import {
  Cas2Application as Application,
  Cas2Application,
} from '../../../../../server/@types/shared/models/Cas2Application'
import paths from '../../../../../server/paths/apply'
import ApplyPage from '../../applyPage'

export default class ContactNumberPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(`What is your contact telephone number?`, application, 'referrer-details', 'contact-number')
  }

  static visit = (application: Cas2Application) => {
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
