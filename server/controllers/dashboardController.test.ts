import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { ServiceSection } from '@approved-premises/ui'
import { sectionsForUser } from '../utils/userUtils'

import DashboardController from './dashboardController'

function createToken(authorities: string[]) {
  const payload = {
    user_name: 'USER1',
    scope: ['read', 'write'],
    auth_source: 'nomis',
    authorities,
    jti: 'a610a10-cca6-41db-985f-e87efb303aaf',
    client_id: 'clientid',
  }

  return jwt.sign(payload, 'secret', { expiresIn: '1h' })
}

jest.mock('../utils/userUtils')

describe('DashboardController', () => {
  const request: DeepMocked<Request> = createMock<Request>({})
  const next: DeepMocked<NextFunction> = createMock<NextFunction>({})

  let dashboardController: DashboardController

  function createResWithToken({ authorities }: { authorities: string[] }): Response {
    return createMock<Response>({
      locals: {
        user: {
          token: createToken(authorities),
        },
      },
    })
  }

  beforeEach(() => {
    dashboardController = new DashboardController()
  })

  describe('index', () => {
    const sections = createMock<Array<ServiceSection>>()
    ;(sectionsForUser as jest.Mock).mockReturnValue(sections)

    it('should extract the user roles from the jwt', () => {
      const response = createResWithToken({ authorities: ['role_1', 'role_2'] })

      const requestHandler = dashboardController.index()

      requestHandler(request, response, next)

      expect(sectionsForUser).toHaveBeenCalledWith(['role_1', 'role_2'])
    })

    it('should render the dashboard template', () => {
      const response = createResWithToken({ authorities: [] })

      const requestHandler = dashboardController.index()

      requestHandler(request, response, next)

      expect(sectionsForUser).toHaveBeenCalledWith([])
      expect(response.render).toHaveBeenCalledWith('dashboard/index', {
        pageHeading: 'CAS2: Short-term accommodation',
        sections,
      })
    })
  })
})
