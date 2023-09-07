import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class RoshSummaryPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Risk of serious harm (RoSH) summary for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'summary',
    )
  }
}
