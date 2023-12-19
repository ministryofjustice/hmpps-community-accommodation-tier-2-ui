/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import ConfirmEligibilityPage from './confirmEligibility'

@Task({
  name: 'Confirm eligibility',
  slug: 'confirm-eligibility',
  pages: [ConfirmEligibilityPage],
})
export default class ConfirmEligibility {}
