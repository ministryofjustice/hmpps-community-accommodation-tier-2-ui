/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import EqualityAndDiversity from './equalityAndDiversity'

@Task({
  name: 'Complete equality and diversity monitoring',
  slug: 'equality-and-diversity-monitoring',
  pages: [EqualityAndDiversity],
})
export default class EqualityAndDiversityMonitoring {}
