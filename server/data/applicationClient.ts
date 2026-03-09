import {
  AssignmentType,
  Cas2Application as Application,
  Cas2ApplicationSummary,
  SubmitCas2Application,
} from '@approved-premises/api'
import { PaginatedResponse } from '@approved-premises/ui'
import { UpdateCas2Application } from '../@types/shared/models/UpdateCas2Application'
import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import paths from '../paths/api'
import { createQueryString } from '../utils/utils'

export default class ApplicationClient {
  restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('applicationClient', config.apis.approvedPremises as ApiConfig, token)
  }

  async find(applicationId: string): Promise<Application> {
    return this.restClient.get<Application>({
      path: paths.applications.show({ id: applicationId }),
    })
  }

  async create(crn: string): Promise<Application> {
    return this.restClient.post<Application>({
      path: paths.applications.new.pattern,
      data: { crn: crn.trim() },
    })
  }

  async getApplications(assignmentType: AssignmentType): Promise<Array<Cas2ApplicationSummary>> {
    return this.restClient.get<Array<Cas2ApplicationSummary>>({
      path: paths.applications.index.pattern,
      query: createQueryString({ assignmentType }),
    })
  }

  async getPagedApplications(
    pageNumber: number,
    assignmentType: AssignmentType,
  ): Promise<PaginatedResponse<Cas2ApplicationSummary>> {
    return this.restClient.getPaginatedResponse<Cas2ApplicationSummary>({
      path: paths.applications.index.pattern,
      page: pageNumber.toString(),
      query: { assignmentType },
    })
  }

  async update(applicationId: string, updateData: UpdateCas2Application): Promise<Application> {
    return this.restClient.put<Application>({
      path: paths.applications.update({ id: applicationId }),
      data: { ...updateData, type: 'CAS2' } as UpdateCas2Application,
    })
  }

  async submit(applicationId: string, submissionData: SubmitCas2Application): Promise<void> {
    await this.restClient.post({
      path: paths.submissions.create.pattern,
      data: { ...submissionData, applicationId },
    })
  }

  async abandon(applicationId: string): Promise<void> {
    await this.restClient.put({
      path: paths.applications.abandon({ id: applicationId }),
    })
  }
}
