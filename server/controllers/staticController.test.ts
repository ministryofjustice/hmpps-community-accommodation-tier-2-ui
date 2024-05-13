import { DeepMocked, createMock } from '@golevelup/ts-jest'
import type { NextFunction, Request, Response } from 'express'

import StaticController from './staticController'

describe('StaticController', () => {
  const request: DeepMocked<Request> = createMock<Request>({})
  const response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = createMock<NextFunction>({})

  let staticController: StaticController

  beforeEach(() => {
    staticController = new StaticController()
  })

  describe('maintenance page', () => {
    it('should render the page', () => {
      const requestHandler = staticController.maintenancePage()
      requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('static/maintenance')
    })
  })

  describe('privacy notice page', () => {
    it('should render the page', () => {
      const requestHandler = staticController.privacyNoticePage()
      requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('static/privacy-notice')
    })
  })

  describe('cookies policy page', () => {
    it('should render the page', () => {
      const requestHandler = staticController.cookiesPolicyPage()
      requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('static/cookies-policy')
    })
  })

  describe('accessibility statement page', () => {
    it('should render the page', () => {
      const requestHandler = staticController.accessibilityStatementPage()
      requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('static/accessibility-statement')
    })
  })
})
