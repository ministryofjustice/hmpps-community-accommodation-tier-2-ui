/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import WorkingMobilePhone from './workingMobilePhone'
import ImmigrationStatus from './immigrationStatus'
import PregnancyInformation from './pregnancyInformation'

@Task({
  name: 'Add personal information',
  slug: 'personal-information',
  pages: [WorkingMobilePhone, ImmigrationStatus, PregnancyInformation],
})
export default class PersonalInformation {}
