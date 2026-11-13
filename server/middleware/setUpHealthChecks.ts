import express, { Router } from 'express'
import { monitoringMiddleware, endpointHealthComponent } from '@ministryofjustice/hmpps-monitoring'
import logger from '../../logger'
import { ApplicationInfo } from '../applicationInfo'
import config from '../config'
import { healthCheckWithPrometheusHandler } from '../services/healthCheck'

export default function setUpHealthChecks(applicationInfo: ApplicationInfo): Router {
  const router = express.Router()

  const apiConfig = Object.entries(config.apis)

  const middleware = monitoringMiddleware({
    applicationInfo,
    healthComponents: apiConfig.map(([name, options]) => endpointHealthComponent(logger, name, options)),
  })

  router.get('/health', healthCheckWithPrometheusHandler(middleware))
  router.get('/info', middleware.info)
  router.get('/ping', middleware.ping)

  router.get('/debug-sentry', (_req, res) => {
    throw new Error('Test Sentry error thrown.')
  })

  return router
}
