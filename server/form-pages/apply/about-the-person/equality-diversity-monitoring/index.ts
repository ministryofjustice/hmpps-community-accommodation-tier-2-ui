/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import WillAnswer from './willAnswer'
import Disability from './disability'
import SexAndGender from './sexAndGender'

@Task({
  name: 'Complete equality and diversity monitoring',
  slug: 'equality-and-diversity-monitoring',
  pages: [WillAnswer, Disability, SexAndGender],
})
export default class EqualityAndDiversityMonitoring {}
