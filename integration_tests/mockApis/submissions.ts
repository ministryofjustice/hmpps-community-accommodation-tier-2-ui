import type {
  Cas2SubmittedApplication as SubmittedApplication,
  Cas2AssessmentStatusUpdate as AssessmentStatusUpdate,
  Cas2SubmittedApplicationSummary,
} from '@approved-premises/api'
import { SuperAgentRequest } from 'superagent'
import { stubFor } from '../../wiremock'
import paths from '../../server/paths/api'

export default {
  stubSubmittedApplicationGet: (args: { application: SubmittedApplication }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/submissions/${args.application.id}`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.application,
      },
    }),
  stubSubmittedApplicationsGet: (args: {
    applications: Array<Cas2SubmittedApplicationSummary>
    page: number
  }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/submissions?page=${args.page}`,
      },
      response: {
        status: 200,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Pagination-TotalPages': '2',
          'X-Pagination-TotalResults': '20',
          'X-Pagination-PageSize': '10',
        },
        jsonBody: args.applications,
      },
    }),
  stubCreateAssessmentStatusUpdate: (args: {
    application: SubmittedApplication
    status: AssessmentStatusUpdate
  }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'POST',
        url: paths.applicationStatusUpdates.create({ id: args.application.id }),
      },
      response: {
        status: 201,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      },
    }),
  stubCreateAssessmentStatusUpdateBadRequest: (args: {
    application: SubmittedApplication
    status: AssessmentStatusUpdate
  }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'POST',
        url: paths.applicationStatusUpdates.create({ id: args.application.id }),
      },
      response: {
        status: 400,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: {
          type: 'https://example.net/validation-error',
          title: 'Invalid request parameters',
          code: 400,
          'invalid-params': [
            {
              propertyName: `$.newStatus`,
              errorType: 'empty',
            },
          ],
        },
      },
    }),
}
