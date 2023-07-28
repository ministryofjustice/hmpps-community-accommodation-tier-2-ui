/* istanbul ignore file */

import { Section } from '../../utils/decorators'
import EqualityAndDiversityMonitoring from './equality-diversity-monitoring'

@Section({
  title: 'About the person',
  tasks: [EqualityAndDiversityMonitoring],
})
export default class AboutThePerson {}
