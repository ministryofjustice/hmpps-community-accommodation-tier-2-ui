import type { Cas2ApplicationStatus as ApplicationStatus } from '@approved-premises/api'
import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import paths from '../paths/api'

export default class ReferenceDataClient {
  restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('referenceDataClient', config.apis.approvedPremises as ApiConfig, token)
  }

  async getApplicationStatuses(): Promise<Array<ApplicationStatus>> {
    const path = paths.referenceData.applicationStatuses({})

    return (await this.restClient.get({ path })) as Array<ApplicationStatus>
  }
}
