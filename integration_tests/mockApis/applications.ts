import type { Cas2Application as Application, Cas2ApplicationNote as ApplicationNote } from '@approved-premises/api'
import { SuperAgentRequest } from 'superagent'
import { getMatchingRequests, stubFor } from '../../wiremock'
import paths from '../../server/paths/api'

export default {
  stubCreateApplication: (args: { application: Application }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'POST',
        url: `/cas2/applications`,
      },
      response: {
        status: 201,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.application,
      },
    }),
  stubCreateApplicationServerError: (args: { application: Application }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'POST',
        url: `/cas2/applications`,
      },
      response: {
        status: 500,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.application,
      },
    }),
  stubApplications: (applications: Array<Application>): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/applications`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: applications,
      },
    }),
  stubPrisonApplications: (args: {
    applications: Array<Application>
    prisonCode: string
    page: number
  }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/applications?page=${args.page}&prisonCode=${args.prisonCode}&isSubmitted=true`,
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
  stubPrisonUnallocatedApplications: (args: {
    applications: Array<Application>
    prisonCode: string
    page: number
  }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/applications?page=${args.page}&prisonCode=${args.prisonCode}&assignmentType=UNALLOCATED`,
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

  stubApplicationGet: (args: { application: Application }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        url: `/cas2/applications/${args.application.id}`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.application,
      },
    }),
  stubApplicationUpdate: (args: { application: Application }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'PUT',
        url: `/cas2/applications/${args.application.id}`,
      },
      response: {
        status: 201,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: { ...args.application, type: 'CAS2' },
      },
    }),
  verifyApplicationUpdate: async (applicationId: string) =>
    (
      await getMatchingRequests({
        method: 'PUT',
        url: paths.applications.update({ id: applicationId }),
      })
    ).body.requests,
  stubApplicationSubmit: (): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'POST',
        url: `/cas2/submissions`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      },
    }),
  stubApplicationAbandon: (args: { application: Application }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'PUT',
        url: `/cas2/applications/${args.application.id}/abandon`,
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.application,
      },
    }),
  stubApplicationAbandonBadRequest: (args: { application: Application }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'PUT',
        url: `/cas2/applications/${args.application.id}/abandon`,
      },
      response: {
        status: 400,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: {
          type: 'https://example.net/validation-error',
          title: 'Application has already been submitted',
          code: 400,
        },
      },
    }),
  stubAddNote: (args: { assessmentId: string; note: ApplicationNote }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'POST',
        url: paths.assessments.applicationNotes.create({ id: args.assessmentId }),
      },
      response: {
        status: 201,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.note,
      },
    }),
  stubAddNoteBadRequest: (args: { assessmentId: string }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'POST',
        url: paths.assessments.applicationNotes.create({ id: args.assessmentId }),
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
              propertyName: `$.note`,
              errorType: 'empty',
            },
          ],
        },
      },
    }),
}
