import { createMock } from '@golevelup/ts-jest'

import type { Request, Response } from 'express'
import type { UserService } from '../services'
import type { UserDetails } from '../services/userService'
import populateCurrentUser from './populateCurrentUser'

describe('populateCurrentUser', () => {
  const userService = createMock<UserService>()

  const userDetailsObject: UserDetails = {
    name: 'FakeUser',
    displayName: 'Fake Display Name',
  }

  beforeEach(() => {
    userService.getUser.mockReset()
  })

  it('set user details from the user service if not already set', async () => {
    const request: jest.Mocked<Request> = createMock<Request>()
    const response: jest.Mocked<Response> = createMock<Response>({
      locals: {
        user: {
          name: 'FakeUser',
          displayName: 'Fake Display Name',
        },
      },
    })
    const next = jest.fn()

    userService.getUser.mockResolvedValue(userDetailsObject)

    populateCurrentUser(userService)(request, response, next)

    expect(response.locals.user).toEqual(userDetailsObject)
  })
})
