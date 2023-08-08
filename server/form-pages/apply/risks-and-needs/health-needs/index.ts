/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import Guidance from './guidance'

@Task({
  name: 'Add health needs',
  slug: 'health-needs',
  pages: [Guidance],
})
export default class HealthNeeds {}
