/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import Guidance from './guidance'
import SubstanceMisuse from './substanceMisuse'

@Task({
  name: 'Add health needs',
  slug: 'health-needs',
  pages: [Guidance, SubstanceMisuse],
})
export default class HealthNeeds {}
