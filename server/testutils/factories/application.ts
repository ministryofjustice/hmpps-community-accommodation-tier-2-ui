import { faker } from '@faker-js/faker/locale/en_GB'
import { Factory } from 'fishery'
import { Cas2Application as Application } from '@approved-premises/api'
import { DateFormats } from '../../utils/dateUtils'
import { fullPersonFactory, restrictedPersonFactory } from './person'
import risksFactory from './risks'
import nomisUserFactory from './nomisUser'

export default Factory.define<Application>(() => ({
  id: faker.string.uuid(),
  person: faker.helpers.arrayElement([fullPersonFactory.build(), restrictedPersonFactory.build()]),
  createdBy: nomisUserFactory.build({}),
  schemaVersion: faker.string.uuid(),
  createdAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  submittedAt: undefined,
  data: {},
  document: {},
  outdatedSchema: faker.datatype.boolean(),
  risks: risksFactory.build(),
  status: 'inProgress' as const,
  type: 'CAS2',
  telephoneNumber: null,
  statusUpdates: null,
  assessment: null,
}))
