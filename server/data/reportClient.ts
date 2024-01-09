import type { Response } from 'express'

import RestClient from './restClient'
import config, { ApiConfig } from '../config'

import paths from '../paths/api'

export default class ReportClient {
  restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('reportClient', config.apis.approvedPremises as ApiConfig, token)
  }

  async getReport(name: string, response: Response): Promise<void> {
    const filename = `cas2-${name}-report.xlsx`
    response.set('Content-Disposition', `attachment; filename="${filename}"`)

    await this.restClient.pipe(
      {
        path: paths.reports.show({ name }),
      },
      response,
    )
  }
}
