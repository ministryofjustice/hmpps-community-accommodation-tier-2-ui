import express, { Express } from 'express'
import request from 'supertest'

import setUpProductInfo from './setUpProductInfo'

const setupApp = (): Express => {
  const app = express()
  app.use(setUpProductInfo())
  return app
}

describe('setUpProductInfo', () => {
  it('should show an empty list of activeAgencies', async () => {
    const app = setupApp()
    request(app)
      .get('/info')
      .expect(200)
      .then(response => {
        expect(response.body.activeAgencies).toEqual([])
      })
  })
})
