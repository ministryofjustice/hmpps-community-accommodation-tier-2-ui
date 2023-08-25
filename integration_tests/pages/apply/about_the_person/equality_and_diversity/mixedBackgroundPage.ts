import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import ApplyPage from '../../applyPage'

export default class MixedBackgroundPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Which of the following best describes ${nameOrPlaceholderCopy(
        application.person,
      )}'s mixed or multiple ethnic groups background?`,
      application,
      'equality-and-diversity-monitoring',
      'mixed-background',
    )
  }

  selectMixedBackground(): void {
    this.checkRadioByNameAndValue('mixedBackground', 'preferNotToSay')
  }
}
