import { ExternalUser } from '@approved-premises/api'
import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

export default Factory.define<ExternalUser>(() => ({
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  origin: 'NACRO',
}))
