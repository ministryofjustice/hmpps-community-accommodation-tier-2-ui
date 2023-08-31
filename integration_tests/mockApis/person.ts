import type { OASysRiskToSelf, Person } from '@approved-premises/api'
import { stubFor } from '../../wiremock'

export default {
  stubOasysRiskToSelf: (args: { crn: string; oasysRiskToSelf: OASysRiskToSelf }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/people/${args.crn}/oasys/risk-to-self`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.oasysRiskToSelf,
      },
    }),

  stubOasysRiskToSelfNotFound: (args: { crn: string }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/people/${args.crn}/oasys/risk-to-self`,
      },
      response: {
        status: 404,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: { status: 404 },
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
