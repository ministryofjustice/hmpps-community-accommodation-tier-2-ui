import type { Request, RequestHandler, Response } from 'express'

export default class StaticController {
  maintenancePage(): RequestHandler {
    return (_req: Request, res: Response) => {
      res.render('static/maintenance')
    }
  }
}
