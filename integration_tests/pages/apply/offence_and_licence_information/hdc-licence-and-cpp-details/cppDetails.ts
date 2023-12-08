import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class CPPDetails extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Who is ${nameOrPlaceholderCopy(application.person, 'The person')}'s Community Probation Practitioner (CPP)?`,
      application,
      'hdc-licence-and-cpp-details',
      'cpp-details',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'hdc-licence-and-cpp-details',
        page: 'cpp-details',
      }),
    )
  }

  completeForm(): void {
    this.getTextInputByIdAndEnterDetails('name', 'A. CPP')
    this.getTextInputByIdAndEnterDetails('probationRegion', 'a probation region')
    this.getTextInputByIdAndEnterDetails('email', 'email@address.com')
    this.getTextInputByIdAndEnterDetails('telephone', '12345')
  }
}
