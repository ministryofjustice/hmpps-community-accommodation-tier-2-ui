/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import ConfirmEligibility from './confirm-eligibility'
import ConfirmConsent from './confirm-consent'

@Section({
  title: 'Before you start',
  tasks: [ConfirmEligibility, ConfirmConsent],
})
export default class BeforeYouStart {}
