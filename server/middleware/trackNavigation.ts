import { Request, Response, NextFunction } from 'express'
import logger from '../../logger'

const MAX_HISTORY_LENGTH = 20

export const trackNavigation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const isPageViewRequest = req.method === 'GET' && req.accepts('html') && !req.originalUrl.startsWith('/assets')

    if (req.session && isPageViewRequest) {
      const currentUrl = req.originalUrl
      const previousUrl = req.session.navigation?.currentURL

      if (!req.session.navigation) {
        req.session.navigation = {
          previousURL: null,
          currentURL: null,
          history: [],
        }
      }

      const { history } = req.session.navigation

      if (currentUrl !== previousUrl) {
        req.session.navigation.previousURL = previousUrl
        req.session.navigation.currentURL = currentUrl

        if (history[history.length - 1] !== currentUrl) {
          history.push(currentUrl)
          if (history.length > MAX_HISTORY_LENGTH) {
            history.shift()
          }
        }
      }
    }
  } catch (err) {
    logger.error('Error tracking navigation in Redis session', err)
  }

  next()
}
