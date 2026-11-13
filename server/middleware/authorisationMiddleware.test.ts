import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'

import authorisationMiddleware from './authorisationMiddleware'

function createToken(authorities: Array<string>, userUuid?: string) {
  const payload = {
    user_name: 'USER1',
    scope: ['read', 'write'],
    auth_source: 'nomis',
    authorities,
    user_uuid: userUuid,
    jti: 'a610a10-cca6-41db-985f-e87efb303aaf',
    client_id: 'clientid',
  }

  return jwt.sign(payload, 'secret', { expiresIn: '1h' })
}

describe('authorisationMiddleware', () => {
  let req: Request
  const next = jest.fn()

  function createResWithToken({ authorities, userUuid }: { authorities: Array<string>; userUuid?: string }): Response {
    return {
      locals: {
        user: {
          token: createToken(authorities, userUuid),
        },
      },
      redirect: jest.fn(),
    } as unknown as Response
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return next when no required roles', async () => {
    const res = createResWithToken({ authorities: [] })

    await authorisationMiddleware()(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.redirect).not.toHaveBeenCalled()
  })

  it('should redirect when user has no authorised roles', async () => {
    const res = createResWithToken({ authorities: [] })

    await authorisationMiddleware(['SOME_REQUIRED_ROLE'])(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.redirect).toHaveBeenCalledWith('/authError')
  })

  it('should return next when user has authorised role', async () => {
    const res = createResWithToken({ authorities: ['SOME_REQUIRED_ROLE'] })

    await authorisationMiddleware(['SOME_REQUIRED_ROLE'])(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.redirect).not.toHaveBeenCalled()
  })
  it('should add the user UUID from the token to res.locals.user', async () => {
    const userUuid = '11111111-1111-4111-8111-111111111111'
    const res = createResWithToken({ authorities: [], userUuid })

    await authorisationMiddleware()(req, res, next)

    expect(res.locals.user.userUuid).toBe(userUuid)
  })
})
