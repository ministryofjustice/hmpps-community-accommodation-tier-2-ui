import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { pageIsActiveInNavigation, pageHasLinkToGuidance } from '../utils'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class CommunicationAndLanguagePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Communication and language needs for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'health-needs',
      'communication-and-language',
    )
    pageHasLinkToGuidance()
    pageIsActiveInNavigation('Communication and language')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'health-needs',
        page: 'communication-and-language',
      }),
    )
  }

  specifyInterpretationNeeds = (): void => {
    this.checkRadioByNameAndValue('requiresInterpreter', 'yes')
    this.getTextInputByIdAndEnterDetails('interpretationDetail', 'Welsh')
  }

  describeSupportNeeded = (): void => {
    this.checkRadioByNameAndValue('hasSupportNeeds', 'yes')
    this.getTextInputByIdAndEnterDetails('supportDetail', 'Struggles with written comprehension')
  }
}
