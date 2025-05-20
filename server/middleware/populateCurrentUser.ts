import { RequestHandler } from 'express'
import { jwtDecode } from 'jwt-decode'
import logger from '../../logger'
import UserService from '../services/userService'

export default function populateCurrentUser(userService: UserService): RequestHandler {
  return async (req, res, next) => {
    try {
      if (res.locals.user) {
        const user = await userService.getUser(res.locals.user.token)
        const { authorities: roles = [] } = jwtDecode(res.locals.user.token) as { authorities?: string[] }
        if (user) {
          res.locals.user = { ...user, ...res.locals.user, roles }
        } else {
          logger.info('No user available')
        }
      }
      next()
    } catch (error) {
      logger.error(error, `Failed to retrieve user: ${res.locals?.user?.staffId}`)
      next(error)
    }
  }
}
