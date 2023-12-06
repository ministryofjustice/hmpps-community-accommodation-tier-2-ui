/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import WorkingMobilePhone from './workingMobilePhone'

@Task({
  name: 'Add personal information',
  slug: 'personal-information',
  pages: [WorkingMobilePhone],
})
export default class PersonalInformation {}
