/* istanbul ignore file */

import { Section, Task } from '../../utils/decorators'
import DescribeSubstanceMisuse from './substance-misuse/describeSubstanceMisuse'
// @Section({
//   title: 'Health needs',
//   tasks: [SubstanceMisuse],
// })

@Task({
  slug: 'health-needs',
  name: 'Substance misuse (task)',
  pages: [DescribeSubstanceMisuse],
})
@Section({
  title: 'Health needs (section)',
  tasks: [HealthNeeds],
})
export default class HealthNeeds {}
