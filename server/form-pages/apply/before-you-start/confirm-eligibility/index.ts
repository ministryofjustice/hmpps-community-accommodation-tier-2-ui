/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import ConfirmEligibilityPage from './confirmEligibility'

@Task({
  name: 'Check eligibility for CAS-2',
  slug: 'confirm-eligibility',
  pages: [ConfirmEligibilityPage],
})
export default class ConfirmEligibility {}
