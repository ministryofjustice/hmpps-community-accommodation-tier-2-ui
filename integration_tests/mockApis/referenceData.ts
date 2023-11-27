import { SuperAgentRequest } from 'superagent'
import { stubFor } from '../../wiremock'
import paths from '../../server/paths/api'
import applicationStatuses from '../../wiremock/stubs/application-statuses.json'

export default {
  stubGetApplicationStatuses: (): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        url: paths.referenceData.applicationStatuses({}),
      },
      response: {
        status: 201,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: applicationStatuses,
      },
    }),
}
