/* istanbul ignore file */

import { dataAccess } from '../data'

import UserService from './userService'
import PersonService from './personService'
import ApplicationService from './applicationService'
import AssessmentService from './assessmentService'
import SubmittedApplicationService from './submittedApplicationService'
import TaskListService from './taskListService'
import AuditService from './auditService'
import config from '../config'
import ReportService from './reportService'
import SessionService from './sessionService'

export const services = () => {
  const {
    hmppsAuthClient,
    personClient,
    applicationClient,
    assessmentClient,
    submittedApplicationClient,
    referenceDataClient,
    reportClient,
  } = dataAccess()

  const userService = new UserService(hmppsAuthClient)
  const personService = new PersonService(personClient)
  const applicationService = new ApplicationService(applicationClient)
  const assessmentService = new AssessmentService(assessmentClient)
  const submittedApplicationService = new SubmittedApplicationService(submittedApplicationClient, referenceDataClient)
  const auditService = new AuditService(config.apis.audit)
  const reportService = new ReportService(reportClient)
  const sessionService = new SessionService()

  return {
    userService,
    personService,
    applicationService,
    assessmentService,
    submittedApplicationService,
    auditService,
    reportService,
    sessionService,
  }
}

export type Services = ReturnType<typeof services>

export {
  UserService,
  PersonService,
  ApplicationService,
  AssessmentService,
  SubmittedApplicationService,
  TaskListService,
  SessionService,
}
