/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import Acct from './acct'
import AcctData from './custom-forms/acctData'
import AdditionalInformation from './additionalInformation'
import OasysImport from './custom-forms/oasysImport'
import Vulnerability from './vulnerability'
import OldOasys from './oldOasys'
import PreviousAndCurrentRisk from './previousAndCurrentRisk'

@Task({
  name: 'Add risk to self information',
  slug: 'risk-to-self',
  pages: [OasysImport, OldOasys, Vulnerability, PreviousAndCurrentRisk, AcctData, Acct, AdditionalInformation],
})
export default class RiskToSelf {}
