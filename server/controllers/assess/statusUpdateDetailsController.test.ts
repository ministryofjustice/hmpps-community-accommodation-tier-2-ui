import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { FullPerson } from '@approved-premises/api'

import { submittedApplicationFactory } from '../../testutils/factories'
import StatusUpdateDetailsController from './statusUpdateDetailsController'
import { SubmittedApplicationService } from '../../services'
import paths from '../../paths/assess'
import applicationStatuses from '../../../wiremock/stubs/application-statuses.json'
import { catchValidationErrorOrPropogate, fetchErrorsAndUserInput } from '../../utils/validation'
import { getStatusDetailsByStatusName, getStatusDetailQuestionText } from '../../utils/assessUtils'

jest.mock('../../utils/validation')
jest.mock('../../utils/assessUtils')

describe('StatusUpdateDetailsController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const submittedApplicationService = createMock<SubmittedApplicationService>({})

  let statusUpdateDetailsController: StatusUpdateDetailsController

  const submittedApplication = submittedApplicationFactory.build({ statusUpdates: [] })

  beforeEach(() => {
    statusUpdateDetailsController = new StatusUpdateDetailsController(submittedApplicationService)

    request = createMock<Request>({ user: { token }, params: { statusName: 'moreInfoRequested' } })
    response = createMock<Response>({})
  })

  describe('new', () => {
    ;(getStatusDetailsByStatusName as jest.Mock).mockImplementation(() => {
      return ['statusDetails']
    })
    ;(getStatusDetailQuestionText as jest.Mock).mockImplementation(() => {
      return `What information do you need?`
    })

    it('renders the status details _new_ template', async () => {
      ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
        return { errors: {}, errorSummary: [], userInput: {} }
      })

      submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)
      submittedApplicationService.getApplicationStatuses.mockResolvedValue(applicationStatuses)

      const person = submittedApplication.person as FullPerson

      const requestHandler = statusUpdateDetailsController.new()
      await requestHandler(request, response, next)

      expect(paths.statusUpdateDetails.new({ id: submittedApplication.id, statusName: 'more-info-requested' })).toEqual(
        `/assess/applications/${submittedApplication.id}/update-status/further-information/more-info-requested`,
      )

      expect(response.render).toHaveBeenCalledWith('assess/statusUpdateDetails/new', {
        application: submittedApplication,
        person,
        currentStatus: 'Received',
        statusName: 'moreInfoRequested',
        statusDetails: ['statusDetails'],
        errorSummary: [],
        errors: {},
        pageHeading: `What information do you need?`,
        questionText: `What information do you need?`,
      })
    })

    it('fails and redirects to the overview page when status name is not valid', async () => {
      ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
        return { errors: {}, errorSummary: [], userInput: {} }
      })

      submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)
      submittedApplicationService.getApplicationStatuses.mockResolvedValue(applicationStatuses)

      request = createMock<Request>({
        user: { token },
        params: { id: submittedApplication.id, statusName: 'invalidStatus' },
      })

      const requestHandler = statusUpdateDetailsController.new()
      await requestHandler(request, response, next)

      expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
        request,
        response,
        expect.any(Error),
        paths.submittedApplications.overview({ id: submittedApplication.id }),
      )
    })
  })

  describe('create', () => {
    const applicationId = 'some-id'

    const status = 'moreInfoRequested'
    const statusDetails = ['aboutTheApplicant', 'areaFundingAndId']

    it('creates a status update detail and redirects to the overview page', async () => {
      request.params = {
        id: applicationId,
        statusName: 'status-name',
      }

      request.body = {
        newStatus: status,
        newStatusDetails: statusDetails,
      }

      const requestHandler = statusUpdateDetailsController.create()
      await requestHandler(request, response, next)

      expect(submittedApplicationService.updateApplicationStatus).toHaveBeenCalledWith(token, applicationId, {
        newStatus: status,
        newStatusDetails: statusDetails,
      })
      expect(response.redirect).toHaveBeenCalledWith(paths.submittedApplications.overview({ id: applicationId }))
    })

    it('renders with errors if the API returns an error', async () => {
      request.params = {
        id: applicationId,
        statusName: 'status-name',
      }

      request.body = {
        newStatus: status,
        newStatusDetails: statusDetails,
      }

      const err = {}
      submittedApplicationService.updateApplicationStatus.mockImplementation(() => {
        throw err
      })

      const requestHandler = statusUpdateDetailsController.create()
      await requestHandler(request, response, next)

      expect(submittedApplicationService.updateApplicationStatus).toHaveBeenCalledWith(token, applicationId, {
        newStatus: status,
        newStatusDetails: statusDetails,
      })
      expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
        request,
        response,
        err,
        paths.statusUpdateDetails.new({ id: applicationId, statusName: 'status-name' }),
      )
    })
  })
})
