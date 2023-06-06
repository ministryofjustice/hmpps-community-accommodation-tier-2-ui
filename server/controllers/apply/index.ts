/* istanbul ignore file */

import ApplicationsController from './applicationsController'

import type { Services } from '../../services'

export const controllers = (services: Services) => {
  const { applicationService, personService } = services
  const applicationsController = new ApplicationsController(personService, applicationService)

  return {
    applicationsController,
  }
}

export { ApplicationsController }
