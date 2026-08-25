import { RequestHandler } from 'express'
import asyncMiddleware from './asyncMiddleware'
import config from '../config'
import staticPaths from '../paths/static'
import { assessPath } from '../paths/assess'
import { applicationsPath } from '../paths/apply'

export default function setupSunsetPageRedirect(): RequestHandler {
  return asyncMiddleware((req, res, next) => {
    if (config.flags.phase2DisableSubmittedApplications) {
      if (req.path.startsWith(assessPath.pattern) || req.path.startsWith(applicationsPath.pattern)) {
        return res.redirect(staticPaths.static.noLongerApply({}))
      }
    }

    return next()
  })
}
