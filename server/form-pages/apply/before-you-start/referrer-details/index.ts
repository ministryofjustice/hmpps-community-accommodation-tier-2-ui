/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import ConfirmDetailsPage from './confirmDetails'
import ContactNumberPage from './contactNumber'
import JobTitlePage from './jobTitle'

@Task({
  name: 'Add referrer details',
  slug: 'referrer-details',
  pages: [ConfirmDetailsPage, JobTitlePage, ContactNumberPage],
})
export default class ReferrerDetails {}
