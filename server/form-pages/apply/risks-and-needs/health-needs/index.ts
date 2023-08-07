/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import CommunicationAndLanguage from './communicationAndLanguage'
import Guidance from './guidance'
import MentalHealth from './mentalHealth'
import PhysicalHealth from './physicalHealth'
import SubstanceMisuse from './substanceMisuse'

@Task({
  name: 'Add health needs',
  slug: 'health-needs',
  pages: [Guidance, SubstanceMisuse, PhysicalHealth, MentalHealth, CommunicationAndLanguage],
})
export default class HealthNeeds {}
