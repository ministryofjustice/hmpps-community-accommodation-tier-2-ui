/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import CurrentOffenceData from './custom-forms/currentOffenceData'
import CurrentOffencesIndexPage from './currentOffences'

@Task({
  name: 'Add current offences',
  slug: 'current-offences',
  pages: [CurrentOffencesIndexPage, CurrentOffenceData],
})
export default class CurrentOffences {}
