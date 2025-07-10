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
  createdAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  submittedAt: undefined,
  allocatedPomName: faker.person.fullName(),
  allocatedPomEmailAddress: faker.internet.email(),
  data: {},
  document: {},
  risks: risksFactory.build(),
  status: 'inProgress' as const,
  type: 'CAS2',
  telephoneNumber: undefined,
  statusUpdates: undefined,
  assessment: undefined,
  isTransferredApplication: faker.datatype.boolean(),
  omuEmailAddress: faker.internet.email(),
}))
