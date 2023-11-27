import { Cas2ApplicationStatus as ApplicationStatus } from '@approved-premises/api'

import ReferenceDataClient from './referenceDataClient'
import { applicationStatusFactory } from '../testutils/factories'
import describeClient from '../testutils/describeClient'

describeClient('ReferenceDataClient', provider => {
  let referenceDataClient: ReferenceDataClient

  const token = 'token-1'

  beforeEach(() => {
    referenceDataClient = new ReferenceDataClient(token)
  })

  describe('getApplicationStatuses', () => {
    it('should return an array of application statuses', async () => {
      const data = applicationStatusFactory.buildList(5) as Array<ApplicationStatus>

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: `A request to get application statuses`,
        withRequest: {
          method: 'GET',
          path: `/cas2/reference-data/application-status`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: data,
        },
      })

      const output = await referenceDataClient.getApplicationStatuses()
      expect(output).toEqual(data)
    })
  })
})
