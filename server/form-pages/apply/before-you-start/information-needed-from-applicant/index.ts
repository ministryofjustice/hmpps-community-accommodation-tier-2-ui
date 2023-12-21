/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import CheckInformationNeededPage from './checkInformationNeeded'

@Task({
  name: 'Check information needed from the applicant',
  slug: 'information-needed-from-applicant',
  pages: [CheckInformationNeededPage],
})
export default class CheckInformationNeeded {}
