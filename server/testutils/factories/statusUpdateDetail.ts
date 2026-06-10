import { Cas2HdcStatusUpdateDetail } from '@approved-premises/api'
import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

export default Factory.define<Cas2HdcStatusUpdateDetail>(() => ({
  id: faker.string.uuid(),
  name: 'healthNeeds',
  label: 'Health needs',
}))
