import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'

import ReportsController from './reportsController'
import ReportService from '../../services/reportService'
import paths from '../../paths/report'

jest.mock('../../utils/validation')

describe('reportsController', () => {
  const token = 'SOME_TOKEN'
  const name = 'submitted-applications'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const reportService = createMock<ReportService>({})

  let reportsController: ReportsController

  beforeEach(() => {
    reportsController = new ReportsController(reportService)
    request = createMock<Request>({ user: { token }, params: { name } })
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
    it('calls the service method with the name of the report to download', async () => {
      const requestHandler = reportsController.create()

      await requestHandler(request, response, next)

      expect(paths.report.create({ name })).toEqual('/reports/submitted-applications')

      expect(reportService.getReport).toHaveBeenCalledWith(name, token, response)
    })

    it('redirects back to new if there is an error', async () => {
      ;(reportService.getReport as jest.Mock).mockRejectedValue(new Error())

      const requestHandler = reportsController.create()

      await requestHandler(request, response, next)

      expect(response.redirect).toHaveBeenCalledWith(paths.report.new({}))
    })
  })
})
