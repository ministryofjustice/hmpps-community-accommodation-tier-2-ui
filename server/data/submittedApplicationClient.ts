import {
  Cas2SubmittedApplication as SubmittedApplication,
  Cas2SubmittedApplicationSummary,
  Cas2ApplicationNote,
} from '@approved-premises/api'
import { PaginatedResponse } from '@approved-premises/ui'
import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import paths from '../paths/api'

export default class SubmittedApplicationClient {
  restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('submittedApplicationClient', config.apis.approvedPremises as ApiConfig, token)
  }

  async all(pageNumber: number): Promise<PaginatedResponse<Cas2SubmittedApplicationSummary>> {
    return this.restClient.getPaginatedResponse<Cas2SubmittedApplicationSummary>({
      path: paths.submissions.index.pattern,
      page: pageNumber.toString(),
      query: {},
    })
  }

  find(applicationId: string): Promise<SubmittedApplication> {
    return this.restClient.get<SubmittedApplication>({
      path: paths.submissions.show({ id: applicationId }),
    })
  }

  addNote(assessmentId: string, newNote: string): Promise<Cas2ApplicationNote> {
    return this.restClient.post<Cas2ApplicationNote>({
      path: paths.assessments.applicationNotes.create({ id: assessmentId }),
      data: { note: newNote },
    })
  }
}
