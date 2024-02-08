import { Factory } from 'fishery'
import { faker } from '@faker-js/faker/locale/en_GB'
import { Cas2ApplicationStatus as ApplicationStatus } from '@approved-premises/api'
import applicationStatusDetailFactory from './applicationStatusDetailFactory'

export default Factory.define<ApplicationStatus>(() => ({
  id: faker.string.uuid(),
  name: 'onWaitingList',
  label: 'On waiting list',
  description: 'The applicant has been added to the waiting list for Short-Term Accommodation (CAS-2).',
  statusDetails: [applicationStatusDetailFactory.build()],
}))
