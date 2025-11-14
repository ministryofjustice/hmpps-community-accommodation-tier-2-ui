import { createMock } from '@golevelup/ts-jest'
import { Request, Response } from 'express'
import validateMiddleware from './validateMiddleware'
import logger from '../../logger'
import { Validators } from '../routes/validators'

jest.mock('../../logger')

describe('validateMiddleware', () => {
  const handler = jest.fn()
  const next = jest.fn()
  const validators: Validators = { id: /^[A]$/ }
  const response = createMock<Response>({})

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('calls handler if middleware validates parameters as OK', async () => {
    const request = createMock<Request>({ params: { id: 'A' } })

    const validatedHandler = validateMiddleware(handler, validators)

    await validatedHandler(request, response, next)

    expect(handler).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it('calls next if there is no validator for a parameter', async () => {
    const request = createMock<Request>({ params: { id: 'A', other: 'B' } })

    const validatedHandler = validateMiddleware(handler, validators)

    await validatedHandler(request, response, next)

    expect(handler).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith('Path parameter validation error other="B"')
  })

  it('calls next if there is a validation failure', async () => {
    const request = createMock<Request>({ params: { id: 'B' } })

    const validatedHandler = validateMiddleware(handler, validators)

    await validatedHandler(request, response, next)

    expect(handler).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith('Path parameter validation error id="B"')
  })
})
