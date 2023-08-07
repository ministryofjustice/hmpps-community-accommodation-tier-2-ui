import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'

export default class OtherBackgroundPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Which of the following best describes ${application.person.name}'s background?`,
      application,
      'equality-and-diversity-monitoring',
      'other-background',
    )
  }

  selectOtherBackground(): void {
    this.checkRadioByNameAndValue('otherBackground', 'arab')
  }
}
