import { Request, RequestHandler, Response, TypedRequestHandler } from 'express'
import paths from '../../paths/report'
import ReportService from '../../services/reportService'

export default class ReportsController {
  constructor(private readonly reportsService: ReportService) {}

  new(): RequestHandler {
    return async (_req: Request, res: Response) => {
      return res.render('reports/new', {})
    }
  }

  create(): TypedRequestHandler<Request, Response> {
    return async (req: Request, res: Response) => {
      try {
        return await this.reportsService.getReport(req.params.name, req.user.token, res)
      } catch (error) {
        return res.redirect(paths.report.new({}))
      }
    }
  }
}
