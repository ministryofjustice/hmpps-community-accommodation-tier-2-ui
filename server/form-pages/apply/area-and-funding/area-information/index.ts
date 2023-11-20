/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import FirstPreferredArea from './firstPreferredArea'

@Task({
  name: 'Add exclusion zones and preferred areas',
  slug: 'area-information',
  pages: [FirstPreferredArea],
})
export default class AreaInformation {}
