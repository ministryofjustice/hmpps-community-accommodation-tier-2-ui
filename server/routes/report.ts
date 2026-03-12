/* istanbul ignore file */

import type { Router } from 'express'

import type { Controllers } from '../controllers'
import paths from '../paths/report'
import { actions } from './utils'

export default function reportRoutes(controllers: Controllers, router: Router): Router {
  const { get } = actions(router)

  const { reportController } = controllers

  get(paths.report.new.pattern, reportController.new(), {
    auditEvent: 'LIST_REPORTS',
  })
  get(paths.report.create.pattern, reportController.create(), {
    auditEvent: 'DOWNLOAD_REPORT',
  })

  return router
}
