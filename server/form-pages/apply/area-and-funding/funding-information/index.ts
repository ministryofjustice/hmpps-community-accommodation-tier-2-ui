/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import FundingInformationPage from './fundingInformation'
import NationalInsurance from './nationalInsurance'
import Identification from './identification'
import AlternativeIdentification from './alternativeID'

@Task({
  name: 'Add funding information',
  slug: 'funding-information',
  pages: [FundingInformationPage, NationalInsurance, Identification, AlternativeIdentification],
})
export default class FundingInformation {}
