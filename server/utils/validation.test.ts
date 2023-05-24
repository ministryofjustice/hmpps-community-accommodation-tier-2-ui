import { Request } from 'express'
import { createMock } from '@golevelup/ts-jest'
import type { ErrorMessages, ErrorSummary } from '@approved-premises/ui'

import { fetchErrorsAndUserInput } from './validation'

describe('fetchErrorsAndUserInput', () => {
  const request = createMock<Request>({})

  let errors: ErrorMessages
  let userInput: Record<string, unknown>
  let errorSummary: ErrorSummary
  let errorTitle: string

  beforeEach(() => {
    ;(request.flash as jest.Mock).mockImplementation((message: string) => {
      return {
        errors: [errors],
        userInput: [userInput],
        errorSummary,
        errorTitle: [errorTitle],
      }[message]
    })
  })

  it('returns default values if there is nothing present', () => {
    const result = fetchErrorsAndUserInput(request)

    expect(result).toEqual({ errors: {}, errorSummary: [], userInput: {}, errorTitle: undefined })
  })

  it('fetches the values from the flash', () => {
    errors = createMock<ErrorMessages>()
    errorSummary = createMock<ErrorSummary>()
    userInput = { foo: 'bar' }
    errorTitle = 'Some title'

    const result = fetchErrorsAndUserInput(request)

    expect(result).toEqual({ errors, errorSummary, userInput, errorTitle })
  })
})
