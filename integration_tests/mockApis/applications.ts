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
  stubAddNote: (args: { applicationId: string; note: ApplicationNote }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'POST',
        url: paths.submissions.applicationNotes.create({ id: args.applicationId }),
      },
      response: {
        status: 201,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: args.note,
      },
    }),
  stubAddNoteBadRequest: (args: { applicationId: string }): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'POST',
        url: paths.submissions.applicationNotes.create({ id: args.applicationId }),
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
