import { faker } from '@faker-js/faker/locale/en_GB'
import { Factory } from 'fishery'
import { Cas2Assessment } from '@approved-premises/api'
import statusUpdateFactory from './statusUpdate'

export default Factory.define<Cas2Assessment>(() => ({
  id: faker.string.uuid(),
  nacroReferralId: faker.string.uuid(),
  assessorName: faker.person.fullName(),
  statusUpdates: statusUpdateFactory.buildList(2),
}))
