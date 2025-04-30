import { Request, Response, NextFunction } from 'express'
import logger from '../../logger'

export const trackNavigation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const isPageViewRequest = req.method === 'GET' && req.accepts('html') && !req.originalUrl.startsWith('/assets')

    if (req.session && isPageViewRequest) {
      const currentUrl = req.originalUrl
      const previousUrl = req.session.navigation?.currentURL

      if (currentUrl !== previousUrl) {
        req.session.navigation = {
          previousURL: previousUrl,
          currentURL: currentUrl,
        }
      }
    }
  } catch (err) {
    logger.error('Error tracking navigation in Redis session', err)
  }

  next()
}
