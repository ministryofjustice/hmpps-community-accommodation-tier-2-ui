import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'

export default class HDCIneligiblePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super('It is too late to submit a CAS2 application', application, 'hdc-licence-dates', 'hdc-ineligible')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'hdc-licence-dates',
        page: 'hdc-ineligible',
      }),
    )
  }

  clickSubmit(): void {
    cy.get('a').contains('Search for a different applicant').click()
  }
}
