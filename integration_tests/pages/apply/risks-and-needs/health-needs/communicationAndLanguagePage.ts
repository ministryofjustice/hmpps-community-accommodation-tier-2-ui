import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { pageIsActiveInNavigation } from '../utils'

export default class CommunicationAndLanguagePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Communication and language needs for ${application.person.name}`,
      application,
      'health-needs',
      'communication-and-language',
    )

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

  describeAdditionalNeeds = (): void => {
    this.checkRadioByNameAndValue('hasCommunicationNeeds', 'yes')
    this.getTextInputByIdAndEnterDetails('communicationDetail', 'Is hard of hearing')
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
