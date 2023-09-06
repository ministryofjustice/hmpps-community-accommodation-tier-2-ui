import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { pageIsActiveInNavigation, pageHasLinkToGuidance } from '../utils'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class PhysicalHealthPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Physical health needs for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'health-needs',
      'physical-health',
    )
    pageHasLinkToGuidance()
    pageIsActiveInNavigation('Physical health')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'health-needs',
        page: 'physical-health',
      }),
    )
  }

  describePhysicalNeeds = (): void => {
    this.checkRadioByNameAndValue('hasPhyHealthNeeds', 'yes')
    this.getTextInputByIdAndEnterDetails('needsDetail', 'Has mobility problems')
    this.checkRadioByNameAndValue('canClimbStairs', 'yes')
  }

  describeTreatment = (): void => {
    this.checkRadioByNameAndValue('isReceivingTreatment', 'yes')
    this.getTextInputByIdAndEnterDetails('treatmentDetail', 'Having physiotherapy')
  }

  describeMedication = (): void => {
    this.checkRadioByNameAndValue('hasPhyHealthMedication', 'yes')
    this.getTextInputByIdAndEnterDetails('medicationDetail', 'Is taking anti-inflammatories')
  }

  provideIndependentLivingInfo = (): void => {
    this.checkRadioByNameAndValue('canLiveIndependently', 'no')
    this.getTextInputByIdAndEnterDetails('indyLivingDetail', 'Needs help with bathing')
  }

  describeAdditionalSupportNeeded = (): void => {
    this.checkRadioByNameAndValue('requiresAdditionalSupport', 'yes')
    this.getTextInputByIdAndEnterDetails('addSupportDetail', 'Needs support with cooking and nutrition')
  }
}
