import type { Cas2SubmittedApplication as SubmittedApplication } from '@approved-premises/api'
import { SuperAgentRequest } from 'superagent'
import { stubFor } from '../../wiremock'

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
}
