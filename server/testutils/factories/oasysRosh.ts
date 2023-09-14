import { Factory } from 'fishery'
import { faker } from '@faker-js/faker/locale/en_GB'

import { OASysRiskOfSeriousHarm } from '@approved-premises/api'
import { DateFormats } from '../../utils/dateUtils'
import { roshSummaryFactory } from './oasysSections'

export default Factory.define<OASysRiskOfSeriousHarm>(() => ({
  assessmentId: faker.number.int(),
  assessmentState: faker.helpers.arrayElement(['Completed', 'Incomplete']),
  dateStarted: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  dateCompleted: DateFormats.dateObjToIsoDateTime(faker.date.recent()),
  rosh: roshSummaryFactory.buildList(5),
}))
