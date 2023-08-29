import { Factory } from 'fishery'
import { faker } from '@faker-js/faker/locale/en_GB'

import { OASysRiskToSelf } from '@approved-premises/api'
import { DateFormats } from '../../utils/dateUtils'
import { riskToSelfFactory } from './oasysSections'

export default Factory.define<OASysRiskToSelf>(() => ({
  assessmentId: faker.number.int(),
  assessmentState: faker.helpers.arrayElement(['Completed', 'Incomplete']),
  dateStarted: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  dateCompleted: DateFormats.dateObjToIsoDateTime(faker.date.recent()),
  riskToSelf: riskToSelfFactory.buildList(5),
}))
