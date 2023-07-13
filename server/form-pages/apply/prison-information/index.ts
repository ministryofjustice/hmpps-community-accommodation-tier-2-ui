/* istanbul ignore file */

import { Section, Task } from '../../utils/decorators'
import DescribePrisonInformation from './describePrisonInformation'

@Task({
  slug: 'prison-information',
  name: 'Prison information',
  pages: [DescribePrisonInformation],
})
@Section({
  title: 'Prison information',
  tasks: [PrisonInformation],
})
export default class PrisonInformation {}
