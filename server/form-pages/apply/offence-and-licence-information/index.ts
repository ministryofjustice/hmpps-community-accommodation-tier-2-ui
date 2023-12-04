/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import OffendingHistory from './offending-history'
import CurrentOffences from './current-offences'
import HDCLicenceAndCPPDetails from './hdc-licence-and-cpp-details'

@Section({
  title: 'Offence and licence information',
  tasks: [CurrentOffences, OffendingHistory, HDCLicenceAndCPPDetails],
})
export default class OffenceAndLicenceInformation {}
