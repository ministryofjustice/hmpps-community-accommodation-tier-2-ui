/* istanbul ignore file */

import type { Request, Response, NextFunction } from 'express'
import type { HTTPError } from 'superagent'
import logger from '../logger'

export default function createErrorHandler(isDevelopment: boolean) {
  return (error: HTTPError, req: Request, res: Response, next: NextFunction): void => {
    logger.error(`Error handling request for '${req.originalUrl}', user '${res.locals.user?.id}'`, error)

    if (error.status === 401 || error.status === 403) {
      logger.info('Logging user out')
      return res.redirect('/sign-out')
    }

    res.locals.message = isDevelopment
      ? error.message
      : 'Something went wrong. The error has been logged. Please try again'
    res.locals.status = error.status
    res.locals.stack = isDevelopment ? error.stack : null

    res.status(error.status || 500)

    return res.render('pages/error')
  }
}
