import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import ApplyPage from './applyPage'

export default class BlackBackgroundPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Which of the following best describes ${application.person.name}'s Black, African, Caribbean or Black British background?`,
      application,
      'equality-and-diversity-monitoring',
      'black-background',
    )
  }

  selectBlackBackground(): void {
    this.checkRadioByNameAndValue('blackBackground', 'african')
  }
}
