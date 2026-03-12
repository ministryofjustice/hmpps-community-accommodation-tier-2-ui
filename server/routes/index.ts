/* istanbul ignore file */

import { Router } from 'express'
import { Controllers } from '../controllers'
import paths from '../paths/apply'
import applyRoutes from './apply'
import assessRoutes from './assess'
import reportRoutes from './report'
import staticRoutes from './static'
import { actions } from './utils'

export default function routes(controllers: Controllers): Router {
  const router = Router()
  const { get, post } = actions(router)

  const { dashboardController } = controllers

  get('/', dashboardController.index(), { auditEvent: 'VIEW_DASHBOARD' })

  const { peopleController } = controllers

  post(paths.applications.people.find.pattern, peopleController.find(), {
    auditEvent: 'FIND_APPLICATION_PERSON',
    auditBodyParams: ['prisonNumber'],
  })

  applyRoutes(controllers, router)
  assessRoutes(controllers, router)
  reportRoutes(controllers, router)
  staticRoutes(controllers, router)

  return router
}
