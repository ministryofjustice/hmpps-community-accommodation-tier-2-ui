import { faker } from '@faker-js/faker/locale/en_GB'
import { Factory } from 'fishery'
import { Cas2Assessment } from '@approved-premises/api'

export default Factory.define<Cas2Assessment>(() => ({
  id: faker.string.uuid(),
  nacroReferralId: faker.string.uuid(),
  assessorName: faker.person.fullName(),
}))
