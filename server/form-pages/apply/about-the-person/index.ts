/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import PersonalInformation from './personal-information'
import AddressHistory from './address-history'
import EqualityAndDiversityMonitoring from './equality-diversity-monitoring'

@Section({
  title: 'About the applicant',
  tasks: [PersonalInformation, AddressHistory, EqualityAndDiversityMonitoring],
})
export default class AboutThePerson {}
