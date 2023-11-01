import { Cas2SubmittedApplication as SubmittedApplication } from '@approved-premises/api'

import type { SubmittedApplicationClient, RestClientBuilder } from '../data'

export default class SubmittedApplicationService {
  constructor(private readonly submittedApplicationClientFactory: RestClientBuilder<SubmittedApplicationClient>) {}

  async findApplication(token: string, id: string): Promise<SubmittedApplication> {
    const applicationClient = this.submittedApplicationClientFactory(token)

    const application = await applicationClient.find(id)

    return application
  }
}
