import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { FullPerson } from '@approved-premises/api'

import { submittedApplicationFactory } from '../../testutils/factories'
import StatusUpdateController from './statusUpdateController'
import { SubmittedApplicationService } from '../../services'
import paths from '../../paths/assess'
import applicationStatuses from '../../../wiremock/stubs/application-statuses.json'
import { catchValidationErrorOrPropogate, fetchErrorsAndUserInput } from '../../utils/validation'

jest.mock('../../utils/validation')

describe('statusUpdateController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const submittedApplicationService = createMock<SubmittedApplicationService>({})

  let statusUpdateController: StatusUpdateController

  const submittedApplication = submittedApplicationFactory.build({ statusUpdates: [] })

  beforeEach(() => {
    statusUpdateController = new StatusUpdateController(submittedApplicationService)

    request = createMock<Request>({ user: { token } })
    response = createMock<Response>({})
  })

  describe('new', () => {
    it('renders the status update _new_ template', async () => {
      ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
        return { errors: {}, errorSummary: [], userInput: {} }
      })

      submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)
      submittedApplicationService.getApplicationStatuses.mockResolvedValue(applicationStatuses)

      const person = submittedApplication.person as FullPerson

      const requestHandler = statusUpdateController.new()
      await requestHandler(request, response, next)

      expect(paths.statusUpdate.new({ id: submittedApplication.id })).toEqual(
        `/assess/applications/${submittedApplication.id}/update-status`,
      )

      expect(response.render).toHaveBeenCalledWith('assess/statusUpdate/new', {
        application: submittedApplication,
        person,
        currentStatus: 'Received',
        statuses: applicationStatuses,
        errorSummary: [],
        errors: {},
        pageHeading: 'What is the new status of the application?',
        questionText: `What is the new status of ${person.name}'s application?`,
      })
    })
  })

  describe('create', () => {
    const applicationId = 'some-id'

    it('creates a status update and redirects to the overview page', async () => {
      const status = 'awaitingDecision'

      request.params = {
        id: applicationId,
      }

      request.body = {
        newStatus: status,
      }

      const requestHandler = statusUpdateController.create()
      await requestHandler(request, response, next)

      expect(submittedApplicationService.updateApplicationStatus).toHaveBeenCalledWith(token, applicationId, {
        newStatus: status,
      })
      expect(response.redirect).toHaveBeenCalledWith(paths.submittedApplications.overview({ id: applicationId }))
    })

    it('renders with errors if the API returns an error', async () => {
      request.params = {
        id: applicationId,
      }

      const err = {}
      submittedApplicationService.updateApplicationStatus.mockImplementation(() => {
        throw err
      })

      const requestHandler = statusUpdateController.create()
      await requestHandler(request, response, next)

      expect(submittedApplicationService.updateApplicationStatus).toHaveBeenCalledWith(token, applicationId, {
        newStatus: undefined,
      })
      expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
        request,
        response,
        err,
        paths.statusUpdate.new({ id: applicationId }),
      )
    })
  })
})
