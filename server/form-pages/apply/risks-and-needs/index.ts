/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import HealthNeeds from './health-needs'
import RiskToSelf from './risk-to-self'
import RiskOfSeriousHarm from './risk-of-serious-harm'

@Section({
  title: 'Risks and needs',
  tasks: [HealthNeeds, RiskToSelf, RiskOfSeriousHarm],
})
export default class RisksAndNeeds {}
