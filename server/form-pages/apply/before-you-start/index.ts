/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import ConfirmEligibility from './confirm-eligibility'

@Section({
  title: 'Before you start',
  tasks: [ConfirmEligibility],
})
export default class BeforeYouStart {}
