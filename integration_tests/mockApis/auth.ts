import jwt from 'jsonwebtoken'
import { Response } from 'superagent'

import { getMatchingRequests, stubFor } from '../../wiremock'
import tokenVerification from './tokenVerification'

const createToken = (authorities: Array<string>) => {
  const payload = {
    user_name: 'USER1',
    scope: ['read'],
    auth_source: 'nomis',
    authorities,
    jti: '83b50a10-cca6-41db-985f-e87efb303ddb',
    client_id: 'clientid',
  }

  return jwt.sign(payload, 'secret', { expiresIn: '1h' })
}

const getSignInUrl = (): Promise<string> =>
  getMatchingRequests({
    method: 'GET',
    urlPath: '/auth/oauth/authorize',
  }).then(data => {
    const { requests } = data.body
    const stateValue = requests[requests.length - 1].queryParams.state.values[0]
    return `/sign-in/callback?code=codexxxx&state=${stateValue}`
  })

const favicon = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/favicon.ico',
    },
    response: {
      status: 200,
    },
  })

const ping = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/auth/health/ping',
    },
    response: {
      status: 200,
    },
  })

const redirect = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/auth/oauth/authorize\\?response_type=code&redirect_uri=.+?&state=.+?&client_id=clientid',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        Location: 'http://localhost:3007/sign-in/callback?code=codexxxx&state=stateyyyy',
      },
      body: '<html lang="en"><head><title>Sign in</title></head><body><main>SignIn page<h1>Sign in</h1></main></body></html>',
    },
  })

const signOut = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/auth/sign-out.*',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: '<html lang="en"><head><title>Sign in</title></head><body><main>SignIn page<h1>Sign in</h1></main></body></html>',
    },
  })

const manageDetails = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/auth/account-details.*',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: '<html lang="en"><head><title>Sign in</title></head><body><main><h1>Your account details</h1></main></body></html>',
    },
  })

const token = (authorities: Array<string>) =>
  stubFor({
    request: {
      method: 'POST',
      urlPattern: '/auth/oauth/token',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Location: 'http://localhost:3007/sign-in/callback?code=codexxxx&state=stateyyyy',
      },
      jsonBody: {
        access_token: createToken(authorities),
        token_type: 'bearer',
        user_name: 'USER1',
        expires_in: 599,
        scope: 'read',
        internalUser: true,
      },
    },
  })

const stubUser = (name: string, activeCaseLoadId?: string) =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/auth/api/user/me',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: {
        staffId: 231232,
        username: 'USER1',
        active: true,
        name,
        activeCaseLoadId,
      },
    },
  })

const stubProfile = (roles = [], userId = '70596333-63d4-4fb2-8acc-9ca55563d878') =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/profile',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: {
        id: userId,
        roles,
      },
    },
  })

const stubUserRoles = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/auth/api/user/me/roles',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: [{ roleCode: 'SOME_USER_ROLE' }],
    },
  })

type UserRole = 'manager'

export default {
  getSignInUrl,
  stubAuthPing: ping,
  stubSignIn: (
    authorities: Array<string> = [],
  ): Promise<[Response, Response, Response, Response, Response, Response]> =>
    Promise.all([
      favicon(),
      redirect(),
      signOut(),
      manageDetails(),
      token(authorities),
      tokenVerification.stubVerifyToken(),
    ]),
  stubAuthUser: (
    args: { name?: string; activeCaseLoadId?: string; userId?: string; roles?: Array<UserRole> } = {},
  ): Promise<[Response, Response, Response]> =>
    Promise.all([
      stubUser(args.name || 'john smith', args.activeCaseLoadId || 'ABC'),
      stubUserRoles(),
      stubProfile(args.roles || [], args.userId),
    ]),
  stubAssessorUser: (
    args: { name?: string; userId?: string; roles?: [] } = {},
  ): Promise<[Response, Response, Response]> =>
    Promise.all([
      stubUser(args.name || 'Mister Assessor'),
      stubUserRoles(),
      stubProfile(args.roles || [], args.userId),
    ]),
}
