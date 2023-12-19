import type { Request, RequestHandler, Response } from 'express'
import { jwtDecode } from 'jwt-decode'
import { sectionsForUser } from '../utils/userUtils'

export default class DashboardController {
  index(): RequestHandler {
    return (_req: Request, res: Response) => {
      const { authorities: roles = [] } = jwtDecode(res.locals.user.token) as { authorities?: string[] }

      const sections = sectionsForUser(roles)

      res.render('dashboard/index', {
        pageHeading: 'CAS2: Short-term accommodation',
        sections,
      })
    }
  }
}
