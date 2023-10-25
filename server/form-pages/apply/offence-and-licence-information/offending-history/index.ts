/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import AnyPreviousConvictions from './anyPreviousConvictions'
import OffenceHistoryData from './custom-forms/offenceHistoryData'
import OffenceHistory from './offenceHistory'

@Task({
  name: 'Add offending history',
  slug: 'offending-history',
  pages: [AnyPreviousConvictions, OffenceHistoryData, OffenceHistory],
})
export default class OffendingHistory {}
