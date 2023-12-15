/* istanbul ignore file */

import { controllers as applyControllers } from './apply'

import { Services } from '../services'
import PeopleController from './peopleController'
import SubmittedApplicationsController from './assess/submittedApplicationsController'
import StatusUpdateController from './assess/statusUpdateController'
import DashboardController from './dashboardController'
import ReportsController from './report/reportsController'

export const controllers = (services: Services) => {
  const dashboardController = new DashboardController()
  const peopleController = new PeopleController(services.applicationService, services.personService)
  const submittedApplicationsController = new SubmittedApplicationsController(services.submittedApplicationService)
  const statusUpdateController = new StatusUpdateController(services.submittedApplicationService)
  const reportController = new ReportsController(services.reportService)
  return {
    dashboardController,
    submittedApplicationsController,
    statusUpdateController,
    peopleController,
    reportController,
    ...applyControllers(services),
  }
}

export type Controllers = ReturnType<typeof controllers>
