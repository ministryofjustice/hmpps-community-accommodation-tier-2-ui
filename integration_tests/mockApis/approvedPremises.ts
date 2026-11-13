import { SuperAgentRequest } from 'superagent'
import { stubFor } from '../../wiremock'

export default {
  stubApprovedPremisesPing: (status = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: '/health/ping',
      },
      response: {
        status,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: { status: 'UP' },
      },
    }),
}
