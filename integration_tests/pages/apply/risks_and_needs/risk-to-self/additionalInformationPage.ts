import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class AdditionalInformationPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Is there anything else to include about ${nameOrPlaceholderCopy(application.person)}'s risk to self?`,
      application,
      'risk-to-self',
      'additional-information',
    )
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

  describeAdditionalNeeds = (): void => {
    this.checkRadioByNameAndValue('hasAdditionalInformation', 'yes')
    this.getTextInputByIdAndEnterDetails('additionalInformationDetail', 'Has risks')
  }
}
