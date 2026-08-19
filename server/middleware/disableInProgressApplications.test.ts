import type { NextFunction, Request, Response } from 'express'
import { createMock } from '@golevelup/ts-jest'
import config from '../config'
import disableInProgressApplications from './disableInProgressApplications'

describe('disableInProgressApplications', () => {
  const request = createMock<Request>({})
  const response = createMock<Response>({})
  const next = jest.fn() as NextFunction

  afterEach(() => {
    config.flags.phase1DisableInprogressApplications = false
  })

  it('redirects to the no longer apply page when in progress applications are disabled', () => {
    config.flags.phase1DisableInprogressApplications = true

    disableInProgressApplications()(request, response, next)

    expect(response.redirect).toHaveBeenCalledWith('/no-longer-apply')
  })
})
