/* istanbul ignore file */

import CheckYourAnswersPage from './check-your-answers/checkYourAnswers'
import { Section, Task } from '../../utils/decorators'

@Task({
  name: 'Check application answers',
  slug: 'check-your-answers',
  pages: [CheckYourAnswersPage],
})
@Section({
  title: 'Check answers',
  tasks: [CheckYourAnswers],
})
export default class CheckYourAnswers {}
