import { NomisUser } from '@approved-premises/api'
import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

export default Factory.define<NomisUser>(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  nomisUsername: faker.internet.userName(),
  email: faker.internet.email(),
  isActive: faker.datatype.boolean(),
}))
