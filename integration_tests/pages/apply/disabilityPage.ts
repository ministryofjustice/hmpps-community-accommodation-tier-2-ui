import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import ApplyPage from './applyPage'

export default class DisabilityPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Does ${application.person.name} have a disability?`,
      application,
      'equality-and-diversity-monitoring',
      'disability',
    )
  }

  enterOtherDisabilityType(): void {
    this.checkRadioByNameAndValue('hasDisability', 'yes')
    this.checkCheckboxByLabel('other')
    this.getTextInputByIdAndEnterDetails('otherDisability', 'a different disability')
  }
}
