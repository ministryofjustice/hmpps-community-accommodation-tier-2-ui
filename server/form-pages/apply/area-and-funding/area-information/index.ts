/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import FirstPreferredArea from './firstPreferredArea'
import SecondPreferredArea from './secondPreferredArea'

@Task({
  name: 'Add exclusion zones and preferred areas',
  slug: 'area-information',
  pages: [FirstPreferredArea, SecondPreferredArea],
})
export default class AreaInformation {}
