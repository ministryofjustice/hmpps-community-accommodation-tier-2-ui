/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import HDCLicenceDatesPage from './hdcLicenceDates'
import HDCWarning from './hdcWarning'

@Task({
  name: 'Add HDC licence dates',
  slug: 'hdc-licence-dates',
  pages: [HDCLicenceDatesPage, HDCWarning],
})
export default class HDCLicenceDates {}
