import {
  Cas2HdcApplication as Application,
  Cas2HdcApplication,
} from '../../../../../server/@types/shared/models/Cas2HdcApplication'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import ApplyPage from '../../applyPage'

export default class CheckInformationNeededPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Check information needed from ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'information-needed-from-applicant',
      'information-needed-from-applicant',
    )
  }

  static visit = (application: Cas2HdcApplication) => {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'information-needed-from-applicant',
        page: 'information-needed-from-applicant',
      }),
    )
  }

  completeForm(): void {
    this.checkRadioByNameAndValue('hasInformationNeeded', 'yes')
  }
}
