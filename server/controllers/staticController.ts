import type { Request, RequestHandler, Response } from 'express'

export default class StaticController {
  maintenancePage(): RequestHandler {
    return (_req: Request, res: Response) => {
      res.render('static/maintenance')
    }
  }

  privacyNoticePage(): RequestHandler {
    return (_req: Request, res: Response) => {
      res.render('static/privacy-notice')
    }
  }

  cookiesPolicyPage(): RequestHandler {
    return (_req: Request, res: Response) => {
      res.render('static/cookies-policy')
    }
  }

  accessibilityStatementPage(): RequestHandler {
    return (_req: Request, res: Response) => {
      res.render('static/accessibility-statement')
    }
  }
}
