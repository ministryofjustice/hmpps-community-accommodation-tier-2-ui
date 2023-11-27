import { Factory } from 'fishery'
import { faker } from '@faker-js/faker/locale/en_GB'
import { Cas2ApplicationStatus as ApplicationStatus } from '@approved-premises/api'

import applicationStatuses from '../../../wiremock/stubs/application-statuses.json'

export default Factory.define<ApplicationStatus>(() => {
  const status = faker.helpers.arrayElement(applicationStatuses)
  return status
})
