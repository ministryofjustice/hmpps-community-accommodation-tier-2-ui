/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import RiskToSelfGuidance from './riskToSelfGuidance'

@Task({
  name: 'Review risk to self information',
  slug: 'risk-to-self',
  pages: [RiskToSelfGuidance],
})
export default class RiskToSelf {}
