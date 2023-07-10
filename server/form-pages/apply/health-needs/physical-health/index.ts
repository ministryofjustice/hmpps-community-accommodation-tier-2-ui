/* istanbul ignore file */
import { Task } from '../../../utils/decorators'

import DescribePhysicalHealth from './describePhysicalHealth'
import DescribeAssistiveNeeds from './describeAssistiveNeeds'

@Task({
  slug: 'physical-health',
  name: 'Physical health',
  pages: [DescribePhysicalHealth, DescribeAssistiveNeeds],
})
export default class PhysicalHealth {}
