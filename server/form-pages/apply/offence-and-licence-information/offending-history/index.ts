/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import AnyPreviousConvictions from './anyPreviousConvictions'

@Task({
  name: 'Add offending history',
  slug: 'offending-history',
  pages: [AnyPreviousConvictions],
})
export default class OffendingHistory {}
