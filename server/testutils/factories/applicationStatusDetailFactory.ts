import { Cas2ApplicationStatusDetail } from '@approved-premises/api'
import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

export default Factory.define<Cas2ApplicationStatusDetail>(() => ({
  id: faker.string.uuid(),
  statusId: faker.string.uuid(),
  name: 'healthNeeds',
  label: 'Health needs',
}))
