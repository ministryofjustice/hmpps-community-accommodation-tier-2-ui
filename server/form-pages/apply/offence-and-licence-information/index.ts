/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import OffendingHistory from './offending-history'

@Section({
  title: 'Offence and licence information',
  tasks: [OffendingHistory],
})
export default class OffenceAndLicenceInformation {}
