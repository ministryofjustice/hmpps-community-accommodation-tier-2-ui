import type { OASysSections } from '@approved-premises/api'
import { stubFor } from '../../wiremock'

export default {
  stubOasysSections: (args: { crn: string; oasysSections: OASysSections }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/people/${args.crn}/oasys/sections`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.oasysSections,
      },
    }),
}
