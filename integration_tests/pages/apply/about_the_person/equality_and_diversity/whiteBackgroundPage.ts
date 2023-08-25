import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import ApplyPage from '../../applyPage'

export default class WhiteBackgroundPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Which of the following best describes ${nameOrPlaceholderCopy(application.person)}'s White background?`,
      application,
      'equality-and-diversity-monitoring',
      'white-background',
    )
  }

  selectWhiteBackground(): void {
    this.checkRadioByNameAndValue('whiteBackground', 'english')
  }
}
