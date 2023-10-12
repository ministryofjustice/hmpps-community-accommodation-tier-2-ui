import type { OASysRiskOfSeriousHarm, OASysRiskToSelf, Person, PersonRisks } from '@approved-premises/api'
import { stubFor } from '../../wiremock'

export default {
  stubOasysRiskToSelf: (args: { crn: string; oasysRiskToSelf: OASysRiskToSelf }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/people/${args.crn}/oasys/risk-to-self`,
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
        url: `/cas2/people/${args.crn}/oasys/risk-to-self`,
      },
      response: {
        status: 404,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: { status: 404 },
      },
    }),

  stubOasysRosh: (args: { crn: string; oasysRosh: OASysRiskOfSeriousHarm }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/people/${args.crn}/oasys/rosh`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.oasysRosh,
      },
    }),

  stubOasysRoshNotFound: (args: { crn: string }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/people/${args.crn}/oasys/rosh`,
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
        url: `/cas2/people/search?crn=${args.person.crn}`,
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
        url: `/cas2/people/search?crn=${args.person.crn}`,
      },
      response: {
        status: 404,
      },
    }),

  stubFindPersonForbidden: (args: { person: Person }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/people/search?crn=${args.person.crn}`,
      },
      response: {
        status: 403,
      },
    }),

  stubPersonRisks: (args: { crn: string; personRisks: PersonRisks }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/people/${args.crn}/risks`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.personRisks,
      },
    }),

  stubPersonRisksNotFound: (args: { crn: string }) =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/people/${args.crn}/risks`,
      },
      response: {
        status: 404,
      },
    }),
}
