import type { Cas2Assessment } from '@approved-premises/api'
import { SuperAgentRequest } from 'superagent'
import { stubFor } from '../../wiremock'
import paths from '../../server/paths/api'

export default {
  stubAssessmentPut: (args: { assessment: Cas2Assessment }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'PUT',
        url: paths.assessments.update({ id: args.assessment.id }),
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.assessment,
      },
    }),
}
