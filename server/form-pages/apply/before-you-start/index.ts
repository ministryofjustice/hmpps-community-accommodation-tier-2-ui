/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import ConfirmEligibility from './confirm-eligibility'
import ConfirmConsent from './confirm-consent'
import ReferrerDetails from './referrer-details'
import CheckInformationNeeded from './information-needed-from-applicant'
import HDCLicenceDates from './hdc-licence-dates'

@Section({
  title: 'Before you apply',
  tasks: [ConfirmEligibility, ConfirmConsent, HDCLicenceDates, ReferrerDetails, CheckInformationNeeded],
})
export default class BeforeYouStart {}
