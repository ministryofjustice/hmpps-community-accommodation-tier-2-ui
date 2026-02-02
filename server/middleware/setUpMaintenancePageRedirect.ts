import express, { Router } from 'express'
import config from '../config'

export default function setUpMaintenancePageRedirect(): Router {
  const router = express.Router()
  const allowedPaths = ['/sign-in', '/sign-in/callback', '/health', '/maintenance']

  router.use((req, res, next) => {
    if (
      config.flags.maintenanceMode &&
      !allowedPaths.includes(req.path) &&
      !res.locals.user?.roles.includes('ROLE_CAS2_ADMIN')
    ) {
      return res.redirect(302, `/maintenance`)
    }

    if (!config.flags.maintenanceMode && req.path === '/maintenance') {
      return res.redirect(302, '/')
    }

    return next()
  })

  return router
}
