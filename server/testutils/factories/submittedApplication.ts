import { faker } from '@faker-js/faker/locale/en_GB'
import { Factory } from 'fishery'
import { Cas2SubmittedApplication as SubmittedApplication } from '@approved-premises/api'
import { DateFormats } from '../../utils/dateUtils'
import { fullPersonFactory } from './person'

export default Factory.define<SubmittedApplication>(() => ({
  id: faker.string.uuid(),
  person: fullPersonFactory.build(),
  createdByUserId: faker.string.uuid(),
  schemaVersion: faker.string.uuid(),
  createdAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  submittedAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  document: {},
  outdatedSchema: faker.datatype.boolean(),
  status: 'submitted' as const,
}))