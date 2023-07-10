/* istanbul ignore file */

import { Section, Task } from '../../utils/decorators'
import DescribeGangAffiliations from './describeGangAffiliations'

@Task({
  slug: 'gang-affiliations',
  name: 'Gang affiliations',
  pages: [DescribeGangAffiliations],
})
@Section({
  title: 'Gang affiliations',
  tasks: [GangAffiliations],
})
export default class GangAffiliations {}
