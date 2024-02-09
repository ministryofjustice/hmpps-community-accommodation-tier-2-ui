import {
  Cas2SubmittedApplication as SubmittedApplication,
  Cas2ApplicationStatus as ApplicationStatus,
  Cas2ApplicationStatusUpdate as ApplicationStatusUpdate,
  Cas2SubmittedApplicationSummary,
} from '@approved-premises/api'
import { PaginatedResponse } from '@approved-premises/ui'

import type { SubmittedApplicationClient, ReferenceDataClient, RestClientBuilder } from '../data'

export default class SubmittedApplicationService {
  constructor(
    private readonly submittedApplicationClientFactory: RestClientBuilder<SubmittedApplicationClient>,
    private readonly referenceDataClientFactory: RestClientBuilder<ReferenceDataClient>,
  ) {}

  async getAll(token: string, pageNumber: number = 1): Promise<PaginatedResponse<Cas2SubmittedApplicationSummary>> {
    const applicationClient = this.submittedApplicationClientFactory(token)

    const applications = await applicationClient.all(pageNumber)

    return applications
  }

  async findApplication(token: string, id: string): Promise<SubmittedApplication> {
    const applicationClient = this.submittedApplicationClientFactory(token)

    const application = await applicationClient.find(id)

    return application
  }

  async getApplicationStatuses(token: string): Promise<Array<ApplicationStatus>> {
    const referenceDataClient = this.referenceDataClientFactory(token)

    const statuses = await referenceDataClient.getApplicationStatuses()

    return statuses
  }

  async updateApplicationStatus(
    token: string,
    applicationId: string,
    newStatus: ApplicationStatusUpdate,
  ): Promise<void> {
    const applicationClient = this.submittedApplicationClientFactory(token)

    await applicationClient.updateStatus(applicationId, newStatus)
  }
}
