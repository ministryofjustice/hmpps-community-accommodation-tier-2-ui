/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import Acct from './acct'
import AdditionalInformation from './additionalInformation'
import CurrentRisk from './currentRisk'
import HistoricalRisk from './historicalRisk'
import RiskToSelfGuidance from './riskToSelfGuidance'
import Vulnerability from './vulnerability'

@Task({
  name: 'Review risk to self information',
  slug: 'risk-to-self',
  pages: [RiskToSelfGuidance, Vulnerability, CurrentRisk, HistoricalRisk, Acct, AdditionalInformation],
})
export default class RiskToSelf {}
