import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'

export default class HDCWarningPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      'It may be too late to offer this applicant a CAS2 placement',
      application,
      'hdc-licence-dates',
      'hdc-warning',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'hdc-licence-dates',
        page: 'hdc-warning',
      }),
    )
  }
}
