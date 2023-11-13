/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import AddressHistory from './address-history'
import EqualityAndDiversityMonitoring from './equality-diversity-monitoring'

@Section({
  title: 'About the person',
  tasks: [AddressHistory, EqualityAndDiversityMonitoring],
})
export default class AboutThePerson {}
