/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import FundingInformation from './funding-information'
import AreaInformation from './area-information'

@Section({
  title: 'Area and funding',
  tasks: [AreaInformation, FundingInformation],
})
export default class AreaAndFunding {}
