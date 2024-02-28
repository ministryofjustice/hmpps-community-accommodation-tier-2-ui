/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import OffendingHistory from './offending-history'
import CurrentOffences from './current-offences'
import CPPDetailsAndHDCLicenceConditions from './cpp-details-and-hdc-licence-conditions'

@Section({
  title: 'Offence and licence information',
  tasks: [CurrentOffences, OffendingHistory, CPPDetailsAndHDCLicenceConditions],
})
export default class OffenceAndLicenceInformation {}
