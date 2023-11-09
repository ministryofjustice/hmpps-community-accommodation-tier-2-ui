import { faker } from '@faker-js/faker/locale/en_GB'
import { Factory } from 'fishery'
import { NomisUser } from '@approved-premises/api'

export default Factory.define<NomisUser>(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  nomisUsername: faker.internet.userName(),
  email: faker.internet.email(),
  isActive: faker.datatype.boolean(),
}))
