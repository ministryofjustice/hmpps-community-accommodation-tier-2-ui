/* istanbul ignore file */
import PrisonInformation from './prison-information'
import HealthNeeds from './health-needs'
import GangAffiliations from './gang-affiliations'

import { Form } from '../utils/decorators'
import BaseForm from '../baseForm'

@Form({ sections: [HealthNeeds, PrisonInformation, GangAffiliations] })
export default class Apply extends BaseForm {}
