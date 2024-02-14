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

export const controllers = (services: Services) => {
  const dashboardController = new DashboardController()
  const peopleController = new PeopleController(services.applicationService, services.personService)
  const submittedApplicationsController = new SubmittedApplicationsController(services.submittedApplicationService)
  const statusUpdateController = new StatusUpdateController(services.submittedApplicationService)
  const statusUpdateDetailsController = new StatusUpdateDetailsController(services.submittedApplicationService)
  const reportController = new ReportsController(services.reportService)
  const staticController = new StaticController()
  return {
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
