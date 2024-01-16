import { Response } from 'express'
import { createMock } from '@golevelup/ts-jest'

import ReportClient from '../data/reportClient'
import ReportService from './reportService'

describe('ReportService', () => {
  const reportClient = new ReportClient(null) as jest.Mocked<ReportClient>
  const reportClientFactory = jest.fn()

  const service = new ReportService(reportClientFactory)

  const token = 'SOME_TOKEN'

  beforeEach(() => {
    jest.resetAllMocks()
    reportClientFactory.mockReturnValue(reportClient)
  })

  describe('getReport', () => {
    it('calls the getReport API client method with the name of the report to get', () => {
      const response = createMock<Response>({})
      service.getReport('report-name', token, response).then(() => {
        expect(reportClientFactory).toHaveBeenCalledWith(token)
        expect(reportClient.getReport).toHaveBeenCalledWith('report-name', response)
      })
    })
  })
})
