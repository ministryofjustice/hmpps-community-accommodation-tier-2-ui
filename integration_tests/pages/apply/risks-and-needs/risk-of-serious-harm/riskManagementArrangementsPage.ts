import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class RiskManagementArrangementsPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Risk management arrangements for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'risk-management-arrangements',
    )
  }
}
