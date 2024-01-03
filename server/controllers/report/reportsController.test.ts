import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'

import ReportsController from './reportsController'

import ReportService from '../../services/reportService'
import paths from '../../paths/report'

jest.mock('../../utils/validation')

describe('reportsController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const reportService = createMock<ReportService>({})

  let reportsController: ReportsController

  beforeEach(() => {
    reportsController = new ReportsController(reportService)
    request = createMock<Request>({ user: { token } })
    response = createMock<Response>({})
    jest.clearAllMocks()
  })

  describe('new', () => {
    it('renders the template', async () => {
      const requestHandler = reportsController.new()

      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('reports/new', {})
    })
  })

  describe('create', () => {
    it('calls the service method to download the report', async () => {
      const requestHandler = reportsController.create()

      await requestHandler(request, response, next)

      expect(reportService.getReport).toHaveBeenCalledWith(token, response)
    })

    it('redirects back to new if there is an error', async () => {
      ;(reportService.getReport as jest.Mock).mockRejectedValue(new Error())

      const requestHandler = reportsController.create()

      await requestHandler(request, response, next)

      expect(response.redirect).toHaveBeenCalledWith(paths.report.new({}))
    })
  })
})
