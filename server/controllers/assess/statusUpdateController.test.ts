import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { Cas2ApplicationStatus, Cas2ApplicationStatusDetail, FullPerson } from '@approved-premises/api'

import { assessmentFactory, submittedApplicationFactory } from '../../testutils/factories'
import StatusUpdateController from './statusUpdateController'
import { AssessmentService, SubmittedApplicationService } from '../../services'
import paths from '../../paths/assess'
import applicationStatuses from '../../../wiremock/stubs/application-statuses.json'
import { catchValidationErrorOrPropogate, fetchErrorsAndUserInput } from '../../utils/validation'
import { validateReferer } from '../../utils/viewUtils'

jest.mock('../../utils/validation')
jest.mock('../../utils/viewUtils')

describe('statusUpdateController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const submittedApplicationService = createMock<SubmittedApplicationService>({})
  const assessmentService = createMock<AssessmentService>({})

  let statusUpdateController: StatusUpdateController

  const submittedApplication = submittedApplicationFactory.build({
    assessment: assessmentFactory.build({ statusUpdates: [] }),
  })

  beforeEach(() => {
    statusUpdateController = new StatusUpdateController(submittedApplicationService, assessmentService)

    request = createMock<Request>({ user: { token }, headers: { referer: 'referer' } })
    response = createMock<Response>({})
  })

  describe('new', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })
    it('renders the status update _new_ template', async () => {
      ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
        return { errors: {}, errorSummary: [], userInput: {} }
      })
      ;(validateReferer as jest.MockedFunction<typeof validateReferer>).mockReturnValue('some-validated-referer')

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
        statusTagColour: 'grey',
        statuses: applicationStatuses,
        errorSummary: [],
        errors: {},
        pageHeading: 'What is the latest status of the application?',
        questionText: `What is the latest status of ${person.name}'s application?`,
        previousPath: 'some-validated-referer',
      })
    })

    describe('when the referrer is the status update details page', () => {
      it('the back button links to the application overview page', async () => {
        ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
          return { errors: {}, errorSummary: [], userInput: {} }
        })

        submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)
        submittedApplicationService.getApplicationStatuses.mockResolvedValue(applicationStatuses)

        const person = submittedApplication.person as FullPerson

        request = createMock<Request>({
          user: { token },
          headers: {
            referer: paths.statusUpdateDetails.new({ id: submittedApplication.id, statusName: 'more-info-requested' }),
          },
        })

        const requestHandler = statusUpdateController.new()
        await requestHandler(request, response, next)

        expect(paths.statusUpdate.new({ id: submittedApplication.id })).toEqual(
          `/assess/applications/${submittedApplication.id}/update-status`,
        )

        expect(response.render).toHaveBeenCalledWith('assess/statusUpdate/new', {
          application: submittedApplication,
          person,
          currentStatus: 'Received',
          statusTagColour: 'grey',
          statuses: applicationStatuses,
          errorSummary: [],
          errors: {},
          pageHeading: 'What is the latest status of the application?',
          questionText: `What is the latest status of ${person.name}'s application?`,
          previousPath: paths.submittedApplications.overview({ id: submittedApplication.id }),
        })
        expect(validateReferer).not.toHaveBeenCalled()
      })
    })
  })

  describe('create', () => {
    const assessmentId = 'some-id'

    describe('when the status does not contain status details', () => {
      it('creates a status update and redirects to the overview page', async () => {
        const status = 'awaitingDecision'

        request.params = {
          id: assessmentId,
        }

        request.query = {
          applicationId: 'application-id',
        }

        request.body = {
          newStatus: status,
        }

        submittedApplicationService.getApplicationStatuses.mockResolvedValue([
          {
            name: 'awaitingDecision',
            statusDetails: [],
          } as Cas2ApplicationStatus,
        ])

        const requestHandler = statusUpdateController.create()
        await requestHandler(request, response, next)

        expect(submittedApplicationService.getApplicationStatuses).toHaveBeenCalledWith(token)
        expect(assessmentService.updateAssessmentStatus).toHaveBeenCalledWith(token, assessmentId, {
          newStatus: status,
        })
        expect(response.redirect).toHaveBeenCalledWith(paths.submittedApplications.overview({ id: 'application-id' }))
      })
    })

    it('renders with errors if the API returns an error', async () => {
      request.params = {
        id: assessmentId,
      }

      request.query = {
        applicationId: 'application-id',
      }

      const err = {}
      assessmentService.updateAssessmentStatus.mockImplementation(() => {
        throw err
      })

      const requestHandler = statusUpdateController.create()
      await requestHandler(request, response, next)

      expect(submittedApplicationService.getApplicationStatuses).toHaveBeenCalledWith(token)
      expect(assessmentService.updateAssessmentStatus).toHaveBeenCalledWith(token, assessmentId, {
        newStatus: undefined,
      })
      expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
        request,
        response,
        err,
        paths.statusUpdate.new({ id: 'application-id' }),
      )
    })

    describe('when the status contains status details', () => {
      it('redirects to the status details page', async () => {
        const status = 'moreInfoRequested'

        request.params = {
          id: assessmentId,
        }

        request.query = {
          applicationId: 'application-id',
        }

        request.body = {
          newStatus: status,
        }

        submittedApplicationService.getApplicationStatuses.mockResolvedValue([
          {
            name: 'moreInfoRequested',
            statusDetails: [
              {
                name: 'aboutTheApplicant',
                label: 'About the applicant',
              },
            ] as Array<Cas2ApplicationStatusDetail>,
          } as Cas2ApplicationStatus,
        ])

        const requestHandler = statusUpdateController.create()
        await requestHandler(request, response, next)

        expect(submittedApplicationService.getApplicationStatuses).toHaveBeenCalledWith(token)
        expect(response.redirect).toHaveBeenCalledWith(
          paths.statusUpdateDetails.new({ id: 'application-id', statusName: 'more-info-requested' }),
        )
      })
    })
  })
})
