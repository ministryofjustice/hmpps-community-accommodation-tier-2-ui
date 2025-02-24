import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class OldOasysPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Does ${nameOrPlaceholderCopy(application.person)} have an older OASys with risk of serious harm (RoSH) information?`,
      application,
      'risk-of-serious-harm',
      'old-oasys',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'old-oasys',
      }),
    )
  }

  completeForm(): void {
    this.checkRadioByNameAndValue('hasOldOasys', 'yes')
    this.getTextInputByIdAndEnterDetails('oasysCompletedDate-day', '1')
    this.getTextInputByIdAndEnterDetails('oasysCompletedDate-month', '1')
    this.getTextInputByIdAndEnterDetails('oasysCompletedDate-year', '2023')
  }

  completeFormForNoOASysData(): void {
    this.checkRadioByNameAndValue('hasOldOasys', 'no')
  }
}
