/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import CurrentRisk from './currentRisk'
import RiskToSelfGuidance from './riskToSelfGuidance'
import Vulnerability from './vulnerability'

@Task({
  name: 'Review risk to self information',
  slug: 'risk-to-self',
  pages: [RiskToSelfGuidance, Vulnerability, CurrentRisk],
})
export default class RiskToSelf {}
