/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import FundingInformation from './funding-information'

@Section({
  title: 'Area and funding',
  tasks: [FundingInformation],
})
export default class AreaAndFunding {}
