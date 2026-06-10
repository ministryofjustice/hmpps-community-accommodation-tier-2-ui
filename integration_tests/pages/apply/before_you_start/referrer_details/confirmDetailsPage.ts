import {
  Cas2HdcApplication as Application,
  Cas2HdcApplication,
} from '../../../../../server/@types/shared/models/Cas2HdcApplication'
import paths from '../../../../../server/paths/apply'
import ApplyPage from '../../applyPage'

export default class ConfirmDetailsPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(`Confirm your details`, application, 'referrer-details', 'confirm-details')
  }

  static visit = (application: Cas2HdcApplication) => {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'referrer-details',
        page: 'confirm-details',
      }),
    )
  }
}
