import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import ApplyPage from './applyPage'

export default class EthnicGroupPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `What is ${application.person.name}'s ethnic group?`,
      application,
      'equality-and-diversity-monitoring',
      'ethnic-group',
    )
  }

  selectEthnicGroup(): void {
    this.checkRadioByNameAndValue('ethnicGroup', 'white')
  }
}
