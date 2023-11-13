/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import PreviousAddress from './previousAddress'

@Task({
  name: 'Add address history',
  slug: 'address-history',
  pages: [PreviousAddress],
})
export default class AddressHistory {}
