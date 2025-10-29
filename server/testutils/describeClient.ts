import path from 'path'
import { pactWith } from 'jest-pact'
import { PactV2 as Pact } from '@pact-foundation/pact'

import config from '../config'

const describeClient = (consumer: string, fn: (provider: Pact) => void) => {
  const provider = 'API'
  const dir = path.join(__dirname, '..', '..', 'tmp', 'pacts')

  describe(consumer, () => {
    pactWith({ consumer, provider, dir }, pact => {
      beforeEach(() => {
        config.apis.approvedPremises.url = pact.mockService.baseUrl
      })

      fn(pact)
    })

    it('meets the contract for the service', async () => {
      const pactPath = `${dir}/${consumer}-${provider}.json`
      await expect(pactPath).toMatchOpenAPISpec()
    }, 15000)
  })
}

export default describeClient
