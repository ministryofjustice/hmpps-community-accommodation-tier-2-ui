/* istanbul ignore file */

import { controllers as applyControllers } from './apply'

import { Services } from '../services'
import PeopleController from './peopleController'
import SubmittedApplicationsController from './assess/submittedApplicationsController'
import StatusUpdateController from './assess/statusUpdateController'
import DashboardController from './dashboardController'

export const controllers = (services: Services) => {
  const dashboardController = new DashboardController()
  const peopleController = new PeopleController(services.applicationService, services.personService)
  const submittedApplicationsController = new SubmittedApplicationsController(services.submittedApplicationService)
  const statusUpdateController = new StatusUpdateController(services.submittedApplicationService)
  return {
    dashboardController,
    submittedApplicationsController,
    statusUpdateController,
    peopleController,
    ...applyControllers(services),
  }
}

export type Controllers = ReturnType<typeof controllers>
