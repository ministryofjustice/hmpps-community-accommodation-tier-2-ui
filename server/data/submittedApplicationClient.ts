import {
  Cas2HdcSubmittedApplication as SubmittedApplication,
  Cas2HdcSubmittedApplicationSummary,
  Cas2HdcApplicationNote,
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

  async all(pageNumber: number): Promise<PaginatedResponse<Cas2HdcSubmittedApplicationSummary>> {
    return this.restClient.getPaginatedResponse<Cas2HdcSubmittedApplicationSummary>({
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

  addNote(assessmentId: string, newNote: string): Promise<Cas2HdcApplicationNote> {
    return this.restClient.post<Cas2HdcApplicationNote>({
      path: paths.assessments.applicationNotes.create({ id: assessmentId }),
      data: { note: newNote },
    })
  }
}
