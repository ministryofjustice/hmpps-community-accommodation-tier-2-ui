import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class ManualRoshInformationPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Create a RoSH summary for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'manual-rosh-information',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'manual-rosh-information',
      }),
    )
  }

  completeFormWithAllLowRisk(): void {
    this.checkRadioByNameAndValue('riskToChildren', 'Low')
    this.checkRadioByNameAndValue('riskToPublic', 'Low')
    this.checkRadioByNameAndValue('riskToKnownAdult', 'Low')
    this.checkRadioByNameAndValue('riskToStaff', 'Low')
    this.checkRadioByNameAndValue('overallRisk', 'Low')
  }

  shouldHaveTaskListLink(application: Application): void {
    cy.get('a').contains('Back to task list').should('have.attr', 'href', `/applications/${application.id}`)
  }
}
