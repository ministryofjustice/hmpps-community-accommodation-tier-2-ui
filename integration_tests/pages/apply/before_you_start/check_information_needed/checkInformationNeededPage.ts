import {
  Cas2Application as Application,
  Cas2Application,
} from '../../../../../server/@types/shared/models/Cas2Application'
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

  static visit = (application: Cas2Application) => {
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
