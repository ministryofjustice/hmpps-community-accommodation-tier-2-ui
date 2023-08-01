/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import EqualityAndDiversity from './equalityAndDiversity'
import Disability from './disability'

@Task({
  name: 'Complete equality and diversity monitoring',
  slug: 'equality-and-diversity-monitoring',
  pages: [EqualityAndDiversity, Disability],
})
export default class EqualityAndDiversityMonitoring {}
