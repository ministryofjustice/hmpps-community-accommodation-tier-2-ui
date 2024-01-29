import express, { Express } from 'express'
import request from 'supertest'

import setUpProductInfo from './setUpProductInfo'
import activePrisons from '../utils/activePrisons'

const setupApp = (): Express => {
  const app = express()
  app.use(setUpProductInfo())
  return app
}

describe('setUpProductInfo', () => {
  it('should show a list of our active Private Beta prisons as activeAgencies', async () => {
    const app = setupApp()
    request(app)
      .get('/info')
      .expect(200)
      .then(response => {
        expect(response.body.activeAgencies).toEqual(activePrisons)
      })
  })
})
