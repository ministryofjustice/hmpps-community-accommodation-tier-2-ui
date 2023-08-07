/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import HealthNeeds from './health-needs'

@Section({
  title: 'Risks and needs',
  tasks: [HealthNeeds],
})
export default class RisksAndNeeds {}
