/* istanbul ignore file */
// import CheckYourAnswers from './check-your-answers'
import HealthNeeds from './health-needs'

import { Form } from '../utils/decorators'
import BaseForm from '../baseForm'

@Form({ sections: [HealthNeeds] })
export default class Apply extends BaseForm {}
