import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'

export default class AdditionalInformationPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super('Additional Information', application, 'risk-to-self', 'additional-information')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-to-self',
        page: 'additional-information',
      }),
    )
  }
}
