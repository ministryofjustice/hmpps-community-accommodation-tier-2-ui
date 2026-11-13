import express, { Express } from 'express'
import request from 'supertest'

import activePrisons from '../utils/activePrisons'
import setUpHealthChecks from './setUpHealthChecks'
import { ApplicationInfo } from '../applicationInfo'

const applicationInfo: ApplicationInfo = {
  applicationName: 'test-app',
  buildNumber: '1.0.0',
  gitRef: 'abcdef1234567890',
  gitShortHash: 'abcdef1',
  productId: 'test-product',
  branchName: 'main',
}

const setupApp = (): Express => {
  const app = express()
  app.use(setUpHealthChecks(applicationInfo))
  return app
}

describe('setUpHealthChecks', () => {
  describe('GET /info', () => {
    it('returns monitoring metadata alongside activeAgencies', async () => {
      const response = await request(setupApp()).get('/info').expect('Content-Type', /json/).expect(200)

      expect(response.body).toEqual({
        git: {
          branch: applicationInfo.branchName,
        },
        build: {
          artifact: applicationInfo.applicationName,
          version: applicationInfo.buildNumber,
          name: applicationInfo.applicationName,
        },
        productId: applicationInfo.productId,
        uptime: expect.any(Number),
        activeAgencies: activePrisons,
      })
      expect(response.body.uptime).toBeGreaterThanOrEqual(0)
    })
  })

  describe('GET /ping', () => {
    it('continues to report the service as up', async () => {
      await request(setupApp()).get('/ping').expect(200, { status: 'UP' })
    })
  })
})
