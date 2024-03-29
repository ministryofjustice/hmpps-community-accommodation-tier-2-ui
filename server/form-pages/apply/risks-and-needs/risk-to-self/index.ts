/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import Acct from './acct'
import AcctData from './custom-forms/acctData'
import AdditionalInformation from './additionalInformation'
import CurrentRisk from './currentRisk'
import HistoricalRisk from './historicalRisk'
import OasysImport from './custom-forms/oasysImport'
import Vulnerability from './vulnerability'

@Task({
  name: 'Add risk to self information',
  slug: 'risk-to-self',
  pages: [OasysImport, Vulnerability, CurrentRisk, HistoricalRisk, AcctData, Acct, AdditionalInformation],
})
export default class RiskToSelf {}
