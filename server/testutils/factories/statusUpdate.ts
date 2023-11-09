import { Cas2StatusUpdate } from '@approved-premises/api'
import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import { DateFormats } from '../../utils/dateUtils'
import externalUser from './externalUser'

export default Factory.define<Cas2StatusUpdate>(() => ({
  id: faker.string.uuid(),
  name: 'Add to wait list',
  label: 'addToWaitlist',
  description: 'User has been added to wait list',
  updatedBy: externalUser.build(),
  updatedAt: DateFormats.dateObjToIsoDateTime(faker.date.recent()),
}))