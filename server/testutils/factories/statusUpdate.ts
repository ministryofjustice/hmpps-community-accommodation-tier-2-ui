import { Cas2StatusUpdate } from '@approved-premises/api'
import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import { DateFormats } from '../../utils/dateUtils'
import externalUser from './externalUser'
import statusUpdateDetail from './statusUpdateDetail'

export default Factory.define<Cas2StatusUpdate>(() => ({
  id: faker.string.uuid(),
  name: 'onWaitingList',
  label: 'On waiting list',
  description: 'No suitable place is currently available.',
  updatedBy: externalUser.build(),
  updatedAt: DateFormats.dateObjToIsoDateTime(faker.date.recent()),
  statusUpdateDetails: [statusUpdateDetail.build()],
}))
