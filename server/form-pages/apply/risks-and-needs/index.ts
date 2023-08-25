/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import HealthNeeds from './health-needs'
import RiskToSelf from './risk-to-self'

@Section({
  title: 'Risks and needs',
  tasks: [HealthNeeds, RiskToSelf],
})
export default class RisksAndNeeds {}
