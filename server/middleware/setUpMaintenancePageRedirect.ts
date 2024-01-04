import express, { Router } from 'express'
import config from '../config'

export default function setUpMaintenancePageRedirect(): Router {
  const router = express.Router()

  router.use((_req, res, next) => {
    if (config.flags.maintenanceMode === 'true') {
      return res.redirect(302, `/maintenance`)
    }
    return next()
  })

  return router
}
