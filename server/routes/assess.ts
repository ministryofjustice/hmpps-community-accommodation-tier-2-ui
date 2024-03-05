/* istanbul ignore file */

import type { Router } from 'express'

import type { Controllers } from '../controllers'
import paths from '../paths/assess'
import { Services } from '../services'
import { actions } from './utils'

export default function applyRoutes(controllers: Controllers, router: Router, services: Services): Router {
  const { get, post } = actions(router, services.auditService)

  const {
    submittedApplicationsController,
    statusUpdateController,
    statusUpdateDetailsController,
    assessmentsController,
  } = controllers

  get(paths.submittedApplications.index.pattern, submittedApplicationsController.index(), {
    auditEvent: 'VIEW_SUBMITTED_APPLICATIONS_LIST',
  })

  get(paths.submittedApplications.show.pattern, submittedApplicationsController.show(), {
    auditEvent: 'VIEW_SUBMITTED_APPLICATION_SHOW',
  })

  get(paths.submittedApplications.overview.pattern, submittedApplicationsController.overview(), {
    auditEvent: 'VIEW_SUBMITTED_APPLICATION_OVERVIEW',
  })

  get(paths.statusUpdate.new.pattern, statusUpdateController.new(), {
    auditEvent: 'NEW_SUBMITTED_APPLICATION_STATUS_UPDATE',
  })

  post(paths.statusUpdate.create.pattern, statusUpdateController.create(), {
    auditEvent: 'CREATE_SUBMITTED_APPLICATION_STATUS_UPDATE',
  })

  get(paths.statusUpdateDetails.new.pattern, statusUpdateDetailsController.new(), {
    auditEvent: 'NEW_SUBMITTED_APPLICATION_FURTHER_INFORMATION_STATUS_UPDATE',
  })

  post(paths.statusUpdateDetails.create.pattern, statusUpdateDetailsController.create(), {
    auditEvent: 'CREATE_SUBMITTED_APPLICATION_FURTHER_INFORMATION_STATUS_UPDATE',
  })

  post(paths.submittedApplications.addNote.pattern, submittedApplicationsController.addNote(), {
    auditEvent: 'CREATE_APPLICATION_NOTE_AS_ASSESSOR',
  })

  get(paths.assessmentDetails.show.pattern, assessmentsController.show(), {
    auditEvent: 'VIEW_ASSESSMENT_SHOW',
  })

  post(paths.assessmentDetails.update.pattern, assessmentsController.update(), {
    auditEvent: 'UPDATE_ASSESSMENT',
  })

  return router
}
