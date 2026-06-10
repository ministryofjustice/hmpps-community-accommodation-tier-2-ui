import type {
  Cas2HdcSubmittedApplication as SubmittedApplication,
  Cas2HdcAssessmentStatusUpdate as AssessmentStatusUpdate,
  Cas2HdcSubmittedApplicationSummary,
} from '@approved-premises/api'
import { SuperAgentRequest } from 'superagent'
import { stubFor } from '../../wiremock'
import paths from '../../server/paths/api'

export default {
  stubSubmittedApplicationGet: (args: { application: SubmittedApplication }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2-hdc/submissions/${args.application.id}`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.application,
      },
    }),
  stubSubmittedApplicationsGet: (args: {
    applications: Array<Cas2HdcSubmittedApplicationSummary>
    page: number
  }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2-hdc/submissions?page=${args.page}`,
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
        url: paths.assessmentStatusUpdates.create({ id: args.application.assessment.id }),
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
        url: paths.assessmentStatusUpdates.create({ id: args.application.assessment.id }),
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
