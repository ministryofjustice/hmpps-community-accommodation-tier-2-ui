/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import FundingInformationPage from './fundingInformation'

@Task({
  name: 'Add funding information',
  slug: 'funding-information',
  pages: [FundingInformationPage],
})
export default class FundingInformation {}
