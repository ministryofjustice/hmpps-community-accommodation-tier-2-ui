import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'

import { applicationFactory } from '../../../testutils/factories'
import { fetchErrorsAndUserInput, errorSummary as errorSummaryMock } from '../../../utils/validation'
import CancelController from './cancelController'
import { ApplicationService } from '../../../services'

import { fullPersonFactory } from '../../../testutils/factories/person'

jest.mock('../../../utils/validation')

describe('cancelController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const applicationService = createMock<ApplicationService>({})

  let cancelController: CancelController

  beforeEach(() => {
    jest.clearAllMocks()
    cancelController = new CancelController(applicationService)

    request = createMock<Request>({
      user: { token },
    })

    request.flash = jest.fn()

    response = createMock<Response>({})
  })

  describe('update', () => {
    describe('when the user has chosen to cancel', () => {
      it('cancels the application and redirects back to dashboard', async () => {
        request.body = { cancelYesOrNo: 'yes' }
        const inProgressApplication = applicationFactory.build()
        applicationService.findApplication.mockResolvedValue(inProgressApplication)
        applicationService.cancel.mockResolvedValue(null)

        const requestHandler = cancelController.update()

        await requestHandler(request, response, next)

        expect(response.redirect).toHaveBeenCalledWith('/applications')
      })
    })

    describe('when the user has chosen  not to cancel', () => {
      it('does not cancel the application and redirects back to dashboard', async () => {
        request.body = { cancelYesOrNo: 'no' }

        const requestHandler = cancelController.update()

        await requestHandler(request, response, next)
        expect(applicationService.findApplication).not.toHaveBeenCalled()
        expect(applicationService.cancel).not.toHaveBeenCalled()

        expect(response.redirect).toHaveBeenCalledWith('/applications')
      })
    })

    describe('when there are errors', () => {
      it('passes errors to the flash ', async () => {
        request.body = { cancelYesOrNo: 'yes' }
        const inProgressApplication = applicationFactory.build()
        request.params = { id: inProgressApplication.id }
        applicationService.findApplication.mockResolvedValue(inProgressApplication)
        applicationService.cancel.mockRejectedValue(new Error())

        const requestHandler = cancelController.update()
        await requestHandler(request, response, next)

        expect(errorSummaryMock).toHaveBeenCalledWith(
          `cancel-${inProgressApplication.id}`,
          'There was an error cancelling the application.',
        )

        expect(response.redirect).toHaveBeenCalledWith('/applications')
      })
    })
  })

  describe('new', () => {
    it('renders the application info and question copy', async () => {
      const person = fullPersonFactory.build()
      const inProgressApplication = applicationFactory.build({ person })
      applicationService.findApplication.mockResolvedValue(inProgressApplication)
      ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
        return { errors: {}, errorSummary: [], userInput: {} }
      })

      const questionCopy = `Are you sure you would like to cancel ${person.name}'s application?`

      const requestHandler = cancelController.new()

      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('applications/cancel', {
        application: inProgressApplication,
        questionCopy,
        errors: {},
        errorSummary: [],
      })
    })
  })
})
