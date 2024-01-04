import express, { Express } from 'express'
import request from 'supertest'
import config from '../config'
import setUpMaintenancePageRedirect from './setUpMaintenancePageRedirect'

const setupApp = (): Express => {
  const app = express()
  app.use(setUpMaintenancePageRedirect())

  app.get('/known', (_req, res, _next) => {
    res.send('known')
  })

  return app
}
describe('setUpMaintenancePageRedirect', () => {
  describe('when the MAINTENANCE_MODE environment is NOT set', () => {
    it('should not redirect to the maintenance page', () => {
      config.flags.maintenanceMode = undefined
      const app = setupApp()
      return request(app).get('/known').expect(200)
    })
  })

  describe('when the MAINTENANCE_MODE environment is set to false', () => {
    it('should not redirect to the maintenance page', () => {
      config.flags.maintenanceMode = 'false'
      const app = setupApp()
      return request(app).get('/known').expect(200)
    })
  })

  describe('when the MAINTENANCE_MODE environment is set to true', () => {
    it('should redirect to the maintenance page', async () => {
      config.flags.maintenanceMode = 'true'
      const app = setupApp()
      const response = await request(app).get('/known').expect(302)
      expect(response.text).toContain('Found. Redirecting to /maintenance')
    })
  })
})
