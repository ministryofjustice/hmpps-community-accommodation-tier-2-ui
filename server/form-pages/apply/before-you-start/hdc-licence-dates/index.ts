/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import HDCLicenceDatesPage from './hdcLicenceDates'
import HDCWarning from './hdcWarning'
import HDCIneligible from './hdcIneligible'

@Task({
  name: 'Add HDC licence dates',
  slug: 'hdc-licence-dates',
  pages: [HDCLicenceDatesPage, HDCWarning, HDCIneligible],
})
export default class HDCLicenceDates {}
