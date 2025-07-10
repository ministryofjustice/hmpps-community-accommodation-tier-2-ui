import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'
import { Cas2ApplicationSummary } from '@approved-premises/api'

import { DateFormats } from '../../utils/dateUtils'
import latestStatusUpdateFactory from './latestStatusUpdate'

export default Factory.define<Cas2ApplicationSummary>(() => ({
  id: faker.string.uuid(),
  type: 'CAS2',
  createdAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  submittedAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  createdByUserId: faker.string.uuid(),
  status: 'inProgress' || 'submitted',
  latestStatusUpdate: latestStatusUpdateFactory.build(),
  personName: faker.person.fullName(),
  crn: `C${faker.number.int({ min: 100000, max: 999999 })}`,
  nomsNumber: `NOMS${faker.number.int({ min: 100, max: 999 })}`,
  hdcEligibilityDate: DateFormats.dateObjToIsoDate(faker.date.soon()),
  createdByUserName: faker.person.fullName(),
  allocatedPomName: faker.person.fullName(),
  allocatedPomUserId: faker.string.uuid(),
  currentPrisonName: faker.location.city(),
  assignmentDate: DateFormats.dateObjToIsoDate(faker.date.past()),
}))
