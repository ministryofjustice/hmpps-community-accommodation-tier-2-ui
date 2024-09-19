import { DeepMocked, createMock } from '@golevelup/ts-jest'
import type { NextFunction, Request, Response } from 'express'
import trimInput from './trimInput'

describe('trimInput middleware', () => {
  const token = 'SOME_TOKEN'
  const dirtyData = {
    foo: '  spaces and tabs and new lines  \n\n   ',
    bar: '  ',
  }
  const cleanData = {
    foo: 'spaces and tabs and new lines',
    bar: '',
  }

  let request: DeepMocked<Request>
  let response: DeepMocked<Response>
  let next: DeepMocked<NextFunction>

  beforeEach(() => {
    request = createMock<Request>({})
    response = createMock<Response>({ locals: { user: { token } } })
    next = jest.fn()

    jest.resetAllMocks()
  })

  it('trims the body properties for POST requests', async () => {
    request.body = dirtyData
    const middleware = trimInput()

    await middleware(request, response, next)

    expect(request.body).toEqual(cleanData)
    expect(next).toHaveBeenCalled()
  })

  it('ignores non-string or nested properties', async () => {
    const noStrings = {
      foo: 123,
      bar: { one: '  ' },
    }
    request.body = noStrings
    const middleware = trimInput()

    await middleware(request, response, next)

    expect(request.body).toEqual(noStrings)
    expect(next).toHaveBeenCalled()
  })

  it('trims the query params for GET requests', async () => {
    request.query = dirtyData
    const middleware = trimInput()

    await middleware(request, response, next)

    expect(request.query).toEqual(cleanData)
    expect(next).toHaveBeenCalled()
  })

  it('ignores requests with no body or query params', async () => {
    request.body = undefined
    request.query = {}

    const middleware = trimInput()

    await middleware(request, response, next)

    expect(request.body).toBeUndefined()
    expect(request.query).toEqual({})
    expect(next).toHaveBeenCalled()
  })
})
