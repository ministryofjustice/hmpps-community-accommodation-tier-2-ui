/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import HDCLicenceDatesPage from './hdcLicenceDates'

@Task({
  name: 'Add HDC licence dates',
  slug: 'hdc-licence-dates',
  pages: [HDCLicenceDatesPage],
})
export default class HDCLicenceDates {}
