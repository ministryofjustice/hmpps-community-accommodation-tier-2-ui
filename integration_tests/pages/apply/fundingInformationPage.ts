import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import ApplyPage from './applyPage'

export default class FundingInformationPage extends ApplyPage {
  constructor(application: Application) {
    super(
      `How will ${application.person.name} pay for their accommodation and service charge`,
      application,
      'funding-information',
      'funding-information',
    )
  }
}
