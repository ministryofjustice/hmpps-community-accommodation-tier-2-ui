import type { OASysSections, Person } from '@approved-premises/api'
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

  stubFindPerson: (args: { person: Person }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/people/search?crn=${args.person.crn}`,
      },
      response: {
        status: 201,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.person,
      },
    }),

  stubPersonNotFound: (args: { person: Person }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/people/search?crn=${args.person.crn}`,
      },
      response: {
        status: 404,
      },
    }),

  stubFindPersonForbidden: (args: { person: Person }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/people/search?crn=${args.person.crn}`,
      },
      response: {
        status: 403,
      },
    }),
}
