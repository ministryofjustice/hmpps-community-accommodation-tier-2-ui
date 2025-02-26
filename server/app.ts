/* istanbul ignore file */

import flash from 'connect-flash'
import express from 'express'
import path from 'path'

import createError from 'http-errors'
import methodOverride from 'method-override'

import errorHandler from './errorHandler'
import authorisationMiddleware from './middleware/authorisationMiddleware'
import { metricsMiddleware } from './monitoring/metricsApp'
import nunjucksSetup from './utils/nunjucksSetup'

import setUpAuthentication from './middleware/setUpAuthentication'
import setUpCsrf from './middleware/setUpCsrf'
import setUpCurrentUser from './middleware/setUpCurrentUser'
import setUpHealthChecks from './middleware/setUpHealthChecks'
import setUpMaintenancePageRedirect from './middleware/setUpMaintenancePageRedirect'
import { setUpSentryErrorHandler, setUpSentryRequestHandler } from './middleware/setUpSentry'
import setUpStaticResources from './middleware/setUpStaticResources'
import setUpWebSecurity from './middleware/setUpWebSecurity'
import setUpWebSession from './middleware/setUpWebSession'
import setUpWebRequestParsing from './middleware/setupRequestParsing'
import { appInsightsMiddleware } from './utils/azureAppInsights'

import { Controllers } from './controllers'
import routes from './routes'
import type { Services } from './services'
import setUpProductInfo from './middleware/setUpProductInfo'

export default function createApp(controllers: Controllers, services: Services): express.Application {
  const app = express()

  app.set('json spaces', 2)
  app.set('trust proxy', true)
  app.set('port', process.env.PORT || 3000)

  setUpSentryRequestHandler(app)
  // Add method-override to allow us to use PUT and DELETE methods
  app.use(methodOverride('_method'))

  app.use(appInsightsMiddleware())
  app.use(metricsMiddleware)
  app.use(setUpHealthChecks())
  app.use(setUpProductInfo())
  app.use(setUpWebSecurity())
  app.use(setUpWebSession())
  app.use(setUpWebRequestParsing())
  app.use(setUpStaticResources())
  nunjucksSetup(app, path)
  app.use(setUpAuthentication())
  app.use(authorisationMiddleware())
  app.use(setUpCsrf())
  app.use(setUpCurrentUser(services))

  app.use(setUpMaintenancePageRedirect())
  app.use((req, res, next) => {
    res.locals.infoMessages = req.flash('info')
    res.locals.successMessages = req.flash('success')
    return next()
  })
  app.use(flash())

  app.use(routes(controllers, services))

  app.use((req, res, next) => next(createError(404, 'Not found')))
  setUpSentryErrorHandler(app)

  app.use(errorHandler(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'))

  return app
}
