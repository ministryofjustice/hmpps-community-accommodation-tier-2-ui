/* istanbul ignore file */

import ApplicationsController from './applicationsController'
import PagesController from './applications/pagesController'

import type { Services } from '../../services'
import CancelController from './applications/cancelController'

export const controllers = (services: Services) => {
  const { applicationService, personService, submittedApplicationService, sessionService } = services
  const applicationsController = new ApplicationsController(
    applicationService,
    submittedApplicationService,
    {
      personService,
      applicationService,
    },
    sessionService
  )
  const pagesController = new PagesController(applicationService, { personService, applicationService })
  const cancelController = new CancelController(applicationService)

  return {
    applicationsController,
    pagesController,
    cancelController,
  }
}

export { ApplicationsController }
