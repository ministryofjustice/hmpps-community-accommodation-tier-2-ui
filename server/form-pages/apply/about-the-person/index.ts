/* istanbul ignore file */

import { Section, Task } from '../../utils/decorators'
import EqualityAndDiversity from './equalityAndDiversity'

@Task({
  slug: 'about-the-person',
  name: 'Complete equality and diversity monitoring',
  pages: [EqualityAndDiversity],
})
@Section({
  title: 'About the person',
  tasks: [AboutThePerson],
})
export default class AboutThePerson {}
