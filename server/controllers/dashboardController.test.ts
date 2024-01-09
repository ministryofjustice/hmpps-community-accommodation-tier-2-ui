import { ServiceSection } from '@approved-premises/ui'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import type { NextFunction, Request, Response } from 'express'
import { sectionsForUser } from '../utils/userUtils'

import DashboardController from './dashboardController'

jest.mock('../utils/userUtils')

describe('DashboardController', () => {
  const request: DeepMocked<Request> = createMock<Request>({})
  const next: DeepMocked<NextFunction> = createMock<NextFunction>({})

  let dashboardController: DashboardController

  beforeEach(() => {
    dashboardController = new DashboardController()
  })

  describe('index', () => {
    const sections = createMock<Array<ServiceSection>>()
    ;(sectionsForUser as jest.Mock).mockReturnValue(sections)

    it('should render the dashboard template', () => {
      const response = createMock<Response>({
        locals: {
          user: {
            roles: ['role_1', 'role_2'],
          },
        },
      })

      const requestHandler = dashboardController.index()

      requestHandler(request, response, next)

      expect(sectionsForUser).toHaveBeenCalledWith(['role_1', 'role_2'])
      expect(response.render).toHaveBeenCalledWith('dashboard/index', {
        pageHeading: 'CAS2: Short-term accommodation',
        sections,
      })
    })
  })
})
