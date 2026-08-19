import type { NextFunction, Request, RequestHandler, Response } from 'express'
import config from '../config'
import staticPaths from '../paths/static'

export default function disableInProgressApplications(): RequestHandler {
  return (_req: Request, res: Response, next: NextFunction) => {
    if (config.flags.phase1DisableInprogressApplications) {
      return res.redirect(staticPaths.static.noLongerApply({}))
    }

    return next()
  }
}
