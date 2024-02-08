import { Cas2StatusUpdateDetail } from '@approved-premises/api'
import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

export default Factory.define<Cas2StatusUpdateDetail>(() => ({
  id: faker.string.uuid(),
  name: 'healthNeeds',
  label: 'Health needs',
}))
