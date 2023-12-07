/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import WorkingMobilePhone from './workingMobilePhone'
import ImmigrationStatus from './immigrationStatus'

@Task({
  name: 'Add personal information',
  slug: 'personal-information',
  pages: [WorkingMobilePhone, ImmigrationStatus],
})
export default class PersonalInformation {}
