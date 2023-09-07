import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class ReducingRiskPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Reducing risk for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'reducing-risk',
    )
  }
}
