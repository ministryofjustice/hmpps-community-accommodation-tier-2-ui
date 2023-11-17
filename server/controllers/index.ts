/* istanbul ignore file */

import { controllers as applyControllers } from './apply'

import { Services } from '../services'
import PeopleController from './peopleController'
import SubmittedApplicationsController from './assess/submittedApplicationsController'
import StatusUpdateController from './assess/statusUpdateController'

export const controllers = (services: Services) => {
  const peopleController = new PeopleController(services.applicationService, services.personService)
  const submittedApplicationsController = new SubmittedApplicationsController(services.submittedApplicationService)
  const statusUpdateController = new StatusUpdateController(services.submittedApplicationService)
  return {
    submittedApplicationsController,
    statusUpdateController,
    peopleController,
    ...applyControllers(services),
  }
}

export type Controllers = ReturnType<typeof controllers>
