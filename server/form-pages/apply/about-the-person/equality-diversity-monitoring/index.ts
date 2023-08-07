/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import WillAnswer from './willAnswer'
import Disability from './disability'
import SexAndGender from './sexAndGender'
import SexualOrientation from './sexualOrientation'
import EthnicGroup from './ethnicGroup'
import WhiteBackground from './whiteBackground'
import MixedBackground from './mixedBackground'

@Task({
  name: 'Complete equality and diversity monitoring',
  slug: 'equality-and-diversity-monitoring',
  pages: [WillAnswer, Disability, SexAndGender, SexualOrientation, EthnicGroup, WhiteBackground, MixedBackground],
})
export default class EqualityAndDiversityMonitoring {}
