/* istanbul ignore file */

import { controllers as applyControllers } from './apply'

import { Services } from '../services'
import PeopleController from './peopleController'
import SubmittedApplicationsController from './assess/submittedApplicationsController'
import StatusUpdateController from './assess/statusUpdateController'
import StatusUpdateDetailsController from './assess/statusUpdateDetailsController'
import DashboardController from './dashboardController'
import ReportsController from './report/reportsController'
import StaticController from './staticController'
import AssessmentsController from './assess/assessmentsController'

export const controllers = (services: Services) => {
  const assessmentsController = new AssessmentsController(
    services.submittedApplicationService,
    services.assessmentService,
  )
  const dashboardController = new DashboardController()
  const peopleController = new PeopleController(services.applicationService, services.personService)
  const submittedApplicationsController = new SubmittedApplicationsController(services.submittedApplicationService)
  const statusUpdateController = new StatusUpdateController(
    services.submittedApplicationService,
    services.assessmentService,
  )
  const statusUpdateDetailsController = new StatusUpdateDetailsController(
    services.submittedApplicationService,
    services.assessmentService,
  )
  const reportController = new ReportsController(services.reportService)
  const staticController = new StaticController()
  return {
    assessmentsController,
    dashboardController,
    submittedApplicationsController,
    statusUpdateController,
    statusUpdateDetailsController,
    peopleController,
    reportController,
    staticController,
    ...applyControllers(services),
  }
}

export type Controllers = ReturnType<typeof controllers>
