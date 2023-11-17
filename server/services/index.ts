/* istanbul ignore file */

import { dataAccess } from '../data'

import UserService from './userService'
import PersonService from './personService'
import ApplicationService from './applicationService'
import SubmittedApplicationService from './submittedApplicationService'
import TaskListService from './taskListService'
import AuditService from './auditService'
import config from '../config'

export const services = () => {
  const { hmppsAuthClient, personClient, applicationClient, submittedApplicationClient, referenceDataClient } =
    dataAccess()

  const userService = new UserService(hmppsAuthClient)
  const personService = new PersonService(personClient)
  const applicationService = new ApplicationService(applicationClient)
  const submittedApplicationService = new SubmittedApplicationService(submittedApplicationClient, referenceDataClient)
  const auditService = new AuditService(config.apis.audit)

  return {
    userService,
    personService,
    applicationService,
    submittedApplicationService,
    auditService,
  }
}

export type Services = ReturnType<typeof services>

export { UserService, PersonService, ApplicationService, SubmittedApplicationService, TaskListService }
