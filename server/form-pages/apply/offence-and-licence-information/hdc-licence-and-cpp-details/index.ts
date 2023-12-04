/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import CPPDetails from './cppDetails'
import HDCLicenceDates from './hdcLicenceDates'
import NonStandardLicenceConditions from './nonStandardLicenceConditions'

@Task({
  name: 'Add HDC licence and CPP details',
  slug: 'hdc-licence-and-cpp-details',
  pages: [HDCLicenceDates, CPPDetails, NonStandardLicenceConditions],
})
export default class HDCLicenceAndCPPDetails {}
