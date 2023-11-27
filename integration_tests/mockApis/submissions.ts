import type {
  Cas2SubmittedApplication as SubmittedApplication,
  Cas2ApplicationStatusUpdate as ApplicationStatusUpdate,
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
  stubCreateApplicationStatusUpdate: (args: {
    application: SubmittedApplication
    status: ApplicationStatusUpdate
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
  stubCreateApplicationStatusUpdateBadRequest: (args: {
    application: SubmittedApplication
    status: ApplicationStatusUpdate
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
