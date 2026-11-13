import { Router } from 'express'
import { telemetryMiddleware } from '@ministryofjustice/hmpps-azure-telemetry'
import auth from '../authentication/auth'
import tokenVerifier from '../data/tokenVerification'
import populateCurrentUser from './populateCurrentUser'
import type { Services } from '../services'

export default function setUpCurrentUser({ userService }: Services): Router {
  const router = Router({ mergeParams: true })
  router.use(auth.authenticationMiddleware(tokenVerifier))
  router.use(telemetryMiddleware.addUserMetadataToTelemetry())
  router.use(populateCurrentUser(userService))
  return router
}
