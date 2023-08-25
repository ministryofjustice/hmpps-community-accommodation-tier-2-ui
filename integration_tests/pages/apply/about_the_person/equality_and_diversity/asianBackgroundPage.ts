import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import ApplyPage from '../../applyPage'

export default class AsianBackgroundPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Which of the following best describes ${nameOrPlaceholderCopy(
        application.person,
      )}'s Asian or Asian British background?`,
      application,
      'equality-and-diversity-monitoring',
      'asian-background',
    )
  }

  selectAsianBackground(): void {
    this.checkRadioByNameAndValue('asianBackground', 'indian')
  }
}
