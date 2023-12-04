import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class HDCLicenceDates extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `${nameOrPlaceholderCopy(application.person, 'The person')}'s Home Detention Curfew (HDC) licence dates`,
      application,
      'hdc-licence-and-cpp-details',
      'hdc-licence-dates',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'hdc-licence-and-cpp-details',
        page: 'hdc-licence-dates',
      }),
    )
  }

  completeForm(): void {
    this.completeDateInputs('hdcEligibilityDate', '2022-07-15')
    this.completeDateInputs('conditionalReleaseDate', '2022-07-15')
  }
}
