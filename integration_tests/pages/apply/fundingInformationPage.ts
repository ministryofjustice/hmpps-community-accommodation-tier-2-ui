import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import ApplyPage from './applyPage'

export default class FundingInformationPage extends ApplyPage {
  constructor(application: Application) {
    super('Funding information for CAS-2 placement', application, 'area-and-funding', 'funding-information')
  }

  completeForm(): void {
    this.checkRadioButtonFromPageBody('reason')
  }
}
