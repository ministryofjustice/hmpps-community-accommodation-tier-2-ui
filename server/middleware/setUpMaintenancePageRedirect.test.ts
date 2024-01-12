import express, { Express } from 'express'
import request from 'supertest'
import config from '../config'
import setUpMaintenancePageRedirect from './setUpMaintenancePageRedirect'

const setupApp = (): Express => {
  const app = express()

  const roles = ['ROLE_POM']
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
  describe('when the IN_MAINTENANCE_MODE environment is NOT set', () => {
    it('should not redirect to the maintenance page', () => {
      config.flags.maintenanceMode = undefined
      const app = setupApp()
      return request(app).get('/known').expect(200)
    })
  })

  describe('when the IN_MAINTENANCE_MODE environment is set to false', () => {
    it('should not redirect to the maintenance page', () => {
      config.flags.maintenanceMode = 'false'
      const app = setupApp()
      return request(app).get('/known').expect(200)
    })
  })

  describe('when the IN_MAINTENANCE_MODE environment is set to true', () => {
    describe('and the value is a string', () => {
      it('should redirect to the maintenance page', async () => {
        config.flags.maintenanceMode = 'true'
        const app = setupApp()
        const response = await request(app).get('/known').expect(302)
        expect(response.text).toContain('Found. Redirecting to /maintenance')
      })
    })

    describe('and the value is a boolean', () => {
      it('should redirect to the maintenance page', async () => {
        config.flags.maintenanceMode = true
        const app = setupApp()
        const response = await request(app).get('/known').expect(302)
        expect(response.text).toContain('Found. Redirecting to /maintenance')
      })
    })

    describe('and the requested page should not be redirected', () => {
      it('should not redirect requests for the maintenance page, endlessly back to the maintenance page', () => {
        config.flags.maintenanceMode = 'true'
        const app = setupApp()
        return request(app).get('/maintenance').expect(200)
      })

      it('should not redirect health requests to the maintenance page', () => {
        config.flags.maintenanceMode = 'true'
        const app = setupApp()
        return request(app).get('/health').expect(200)
      })

      it('should not redirect sign in requests to the maintenance page', () => {
        config.flags.maintenanceMode = 'true'
        const app = setupApp()
        return request(app).get('/sign-in').expect(200)
      })

      it('should not redirect sign in callbacks to the maintenance page', () => {
        config.flags.maintenanceMode = 'true'
        const app = setupApp()
        return request(app).get('/sign-in/callback').expect(200)
      })
    })

    describe('when the user has the CAS2_ADMIN role', () => {
      const setupAppWithRoleStubbed = (): Express => {
        const app = express()

        const roles = ['ROLE_CAS2_ADMIN']
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

      it('should not redirect to the maintenance page', () => {
        config.flags.maintenanceMode = 'true'

        const app = setupAppWithRoleStubbed()

        return request(app).get('/known').expect(200)
      })
    })
  })

  describe('when the user has no roles', () => {
    const setupAppWithRolesMissing = (): Express => {
      const app = express()

      app.use((req, res, next) => {
        res.locals = res.locals || {}
        res.locals.user = res.locals.user || {}
        // The test here is to omit the roles object
        // res.locals.user.roles = roles
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

    it('should not error', () => {
      config.flags.maintenanceMode = 'false'

      const app = setupAppWithRolesMissing()

      return request(app).get('/known').expect(200)
    })
  })
})
