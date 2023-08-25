import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import ApplyPage from '../../applyPage'

export default class BlackBackgroundPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Which of the following best describes ${nameOrPlaceholderCopy(
        application.person,
      )}'s Black, African, Caribbean or Black British background?`,
      application,
      'equality-and-diversity-monitoring',
      'black-background',
    )
  }

  selectBlackBackground(): void {
    this.checkRadioByNameAndValue('blackBackground', 'african')
  }
}
