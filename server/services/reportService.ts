import type { Response } from 'express'

import type { RestClientBuilder } from '../data'

import ReportClient from '../data/reportClient'

export default class ReportService {
  constructor(private readonly reportClientFactory: RestClientBuilder<ReportClient>) {}

  async getReport(name: string, token: string, response: Response): Promise<void> {
    const client = this.reportClientFactory(token)

    return client.getReport(name, response)
  }
}
