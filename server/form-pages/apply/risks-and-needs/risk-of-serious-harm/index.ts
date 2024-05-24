import { Task } from '../../../utils/decorators'
import OasysImport from './custom-forms/oasysImport'
import Summary from './summary'
import RiskToOthers from './riskToOthers'
import RiskFactors from './riskFactors'
import RiskManagementArrangements from './riskManagementArrangements'
import CellShareInformation from './cellShareInformation'
import AdditionalRiskInformation from './additionalRiskInformation'
import OldOasys from './oldOasys'

@Task({
  name: 'Add risk of serious harm (RoSH) information',
  slug: 'risk-of-serious-harm',
  pages: [
    OasysImport,
    Summary,
    OldOasys,
    RiskToOthers,
    RiskFactors,
    RiskManagementArrangements,
    CellShareInformation,
    AdditionalRiskInformation,
  ],
})
export default class RiskOfSeriousHarm {}
