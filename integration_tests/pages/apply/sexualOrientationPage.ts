import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import ApplyPage from './applyPage'

export default class SexualOrientationPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Which of the following best describes ${application.person.name}'s sexual orientation?`,
      application,
      'equality-and-diversity-monitoring',
      'sexual-orientation',
    )
  }

  selectOrientation(): void {
    this.checkRadioByNameAndValue('orientation', 'gay')
  }
}
