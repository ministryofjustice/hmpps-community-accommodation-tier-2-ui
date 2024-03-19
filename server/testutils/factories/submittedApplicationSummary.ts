import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'
import { Cas2SubmittedApplicationSummary } from '@approved-premises/api'

import { DateFormats } from '../../utils/dateUtils'
import { fullPersonFactory } from './person'

export default Factory.define<Cas2SubmittedApplicationSummary>(() => ({
  id: faker.string.uuid(),
  type: 'CAS2',
  person: fullPersonFactory.build(),
  createdAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  submittedAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  createdByUserId: faker.string.uuid(),
  status: 'submitted',
  crn: faker.string.alphanumeric(5),
  nomsNumber: faker.string.alphanumeric(5),
  personName: faker.person.fullName(),
}))
