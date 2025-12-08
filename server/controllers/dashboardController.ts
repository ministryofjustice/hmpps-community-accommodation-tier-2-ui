import type { Request, RequestHandler, Response } from 'express'
import { sectionsForUser } from '../utils/userUtils'

export default class DashboardController {
  index(): RequestHandler {
    return (_req: Request, res: Response) => {
      const sections = sectionsForUser(res.locals.user.roles)

      res.render('dashboard/index', {
        pageHeading: 'CAS2 for HDC',
        sections,
      })
    }
  }
}
