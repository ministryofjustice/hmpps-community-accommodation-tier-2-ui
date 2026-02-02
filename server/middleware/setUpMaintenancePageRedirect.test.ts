import express, { Express } from 'express'
import request from 'supertest'
import config from '../config'
import setUpMaintenancePageRedirect from './setUpMaintenancePageRedirect'

const setupApp = (roles: Array<string> = []): Express => {
  const app = express()

  app.use((req, res, next) => {
    res.locals = res.locals || {}
    res.locals.user = res.locals.user || {}
    res.locals.user.roles = roles
    next()
  })

  app.use(setUpMaintenancePageRedirect())

  const allowedPaths = ['/known', '/maintenance', '/health', '/sign-in', '/sign-in/callback']

  allowedPaths.forEach(path => {
    app.get(path, (_req, res, _next) => {
      res.send(path.slice(1))
    })
  })

  return app
}

describe('setUpMaintenancePageRedirect', () => {
  let app: Express

  describe('when the IN_MAINTENANCE_MODE environment is set to false', () => {
    beforeEach(() => {
      config.flags.maintenanceMode = false
      app = setupApp(['ROLES_POM'])
    })

    it('should not redirect to the maintenance page', () => {
      return request(app).get('/known').expect(200)
    })

    it('should redirect requests to the maintenance page back to the dashboard', async () => {
      const response = await request(app).get('/maintenance').expect(302)
      expect(response.text).toContain('Found. Redirecting to /')
    })
  })

  describe('when the IN_MAINTENANCE_MODE environment is set to true', () => {
    beforeEach(() => {
      config.flags.maintenanceMode = true
      app = setupApp(['ROLES_POM'])
    })

    describe('and the request page should be redirected', () => {
      it('should redirect to the maintenance page', async () => {
        const response = await request(app).get('/known').expect(302)
        expect(response.text).toContain('Found. Redirecting to /maintenance')
      })
    })

    describe('and the requested page should not be redirected', () => {
      it.each([
        ['health endpoint', '/health'],
        ['maintenance page', '/maintenance'],
        ['sign-in page', '/sign-in'],
        ['sign-in callback page', '/sign-in/callback'],
      ])('should not redirect requests for the %s at %s', (_, path) => {
        return request(app).get(path).expect(200)
      })
    })

    describe('when the user has the CAS2_ADMIN role', () => {
      beforeEach(() => {
        app = setupApp(['ROLE_CAS2_ADMIN'])
      })

      it('should not redirect to the maintenance page', () => {
        return request(app).get('/known').expect(200)
      })
    })
  })
})
