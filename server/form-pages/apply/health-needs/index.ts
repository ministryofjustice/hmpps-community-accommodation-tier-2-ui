/* istanbul ignore file */

import { Section, Task } from '../../utils/decorators'
import DescribeSubstanceMisuse from './substance-misuse/describeSubstanceMisuse'
import DescribePhysicalHealth from './physical-health/describePhysicalHealth'
import PhysicalHealth from './physical-health'

@Task({
  slug: 'health-needs',
  name: 'Substance misuse',
  pages: [DescribeSubstanceMisuse, DescribePhysicalHealth],
})
@Section({
  title: 'Health needs',
  tasks: [HealthNeeds, PhysicalHealth],
})
export default class HealthNeeds {}
