import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { OASysSections } from '@approved-premises/api'
import { ErrorsAndUserInput } from '@approved-premises/ui'

import { fetchErrorsAndUserInput } from '../../utils/validation'
import ApplicationsController from './applicationsController'
import { PersonService } from '../../services'

jest.mock('../../utils/validation')

describe('applicationsController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const personService = createMock<PersonService>({})

  let applicationsController: ApplicationsController

  beforeEach(() => {
    applicationsController = new ApplicationsController(personService)
    request = createMock<Request>({ user: { token } })
    response = createMock<Response>({})
    jest.clearAllMocks()
  })

  describe('new', () => {
    it('renders the crn form', () => {
      ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
        return { errors: {}, errorSummary: [], userInput: {} }
      })

      const requestHandler = applicationsController.new()

      requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('applications/new', {
        pageHeading: "Enter the person's CRN",
        errors: {},
        errorSummary: [],
      })
    })

    it('renders the form with errors and user input if an error has been sent to the flash', async () => {
      const errorsAndUserInput = createMock<ErrorsAndUserInput>()
      ;(fetchErrorsAndUserInput as jest.Mock).mockReturnValue(errorsAndUserInput)

      const requestHandler = applicationsController.new()
      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('applications/new', {
        pageHeading: "Enter the person's CRN",
        errors: errorsAndUserInput.errors,
        errorSummary: errorsAndUserInput.errorSummary,
        ...errorsAndUserInput.userInput,
      })
    })
  })

  describe('show', () => {
    it('renders oasys information view', async () => {
      const oasysSections = {
        roshSummary: [{}],
      }
      personService.getOasysSections.mockResolvedValue(oasysSections as OASysSections)

      const requestHandler = applicationsController.show()
      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('applications/pages/oasys-import/oasys-information', {
        pageHeading: 'Risk of Serious Harm Summary',
        oasysSections,
      })
    })
  })
})
