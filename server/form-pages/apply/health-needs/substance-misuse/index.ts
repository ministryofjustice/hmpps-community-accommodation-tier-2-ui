/* istanbul ignore file */
import { Task } from '../../../utils/decorators'

import DescribeSubstanceMisuse from './describeSubstanceMisuse'

@Task({
  slug: 'substance-misuse',
  name: 'Substance misuse',
  pages: [DescribeSubstanceMisuse],
})

export default class SubstanceMisuse {}
