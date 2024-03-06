/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import CPPDetails from './cppDetails'
import NonStandardLicenceConditions from './nonStandardLicenceConditions'

@Task({
  name: 'Add CPP details and HDC licence conditions',
  slug: 'cpp-details-and-hdc-licence-conditions',
  pages: [CPPDetails, NonStandardLicenceConditions],
})
export default class CPPDetailsAndHDCLicenceConditions {}
