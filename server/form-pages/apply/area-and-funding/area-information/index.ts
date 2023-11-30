/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import FirstPreferredArea from './firstPreferredArea'
import SecondPreferredArea from './secondPreferredArea'
import ExclusionZones from './exclusionZones'
import FamilyAccommodation from './familyAccommodation'

@Task({
  name: 'Add exclusion zones and preferred areas',
  slug: 'area-information',
  pages: [FirstPreferredArea, SecondPreferredArea, ExclusionZones, FamilyAccommodation],
})
export default class AreaInformation {}
