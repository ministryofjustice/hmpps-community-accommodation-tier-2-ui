import { Task } from '../../../utils/decorators'
import OasysImport from './custom-forms/oasysImport'

@Task({
  name: 'Review risk of serious harm (RoSH) information',
  slug: 'risk-of-serious-harm',
  pages: [OasysImport],
})
export default class RiskOfSeriousHarm {}
