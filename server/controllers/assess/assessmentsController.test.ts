import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { UpdateCas2Assessment } from '@approved-premises/api'

import AssessmentsController from './assessmentsController'
import { AssessmentService, SubmittedApplicationService } from '../../services'
import { assessmentFactory, submittedApplicationFactory } from '../../testutils/factories'
import paths from '../../paths/assess'
import { catchValidationErrorOrPropogate, fetchErrorsAndUserInput } from '../../utils/validation'
import { assessmentHasExistingData } from '../../utils/assessmentUtils'

jest.mock('../../utils/assessmentUtils')
jest.mock('../../utils/validation')

describe('AssessmentsController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const submittedApplicationService = createMock<SubmittedApplicationService>({})
  const assessmentService = createMock<AssessmentService>({})

  let assessmentsController: AssessmentsController

  const assessment = assessmentFactory.build({})

  const submittedApplication = submittedApplicationFactory.build({
    assessment,
  })

  beforeEach(() => {
    assessmentsController = new AssessmentsController(submittedApplicationService, assessmentService)

    request = createMock<Request>({ user: { token } })
    response = createMock<Response>({})
  })

  describe('show', () => {
    ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
      return { errors: {}, errorSummary: [], userInput: {} }
    })
    ;(assessmentHasExistingData as jest.Mock).mockReturnValue(false)

    it('renders the assessments/show template', async () => {
      submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)

      const requestHandler = assessmentsController.show()
      await requestHandler(request, response, next)

      expect(paths.assessmentDetails.show({ id: submittedApplication.id })).toEqual(
        `/assess/applications/${submittedApplication.id}/assessment-details`,
      )

      expect(response.render).toHaveBeenCalledWith('assess/applications/assessments/show', {
        errors: {},
        errorSummary: [],
        application: submittedApplication,
        assessmentHasExistingData: false,
        assessorName: assessment.assessorName,
        nacroReferralId: assessment.nacroReferralId,
        pageHeading: 'Add assessment details',
      })
    })

    describe('when there is an error', () => {
      it('passes the error to the error handler', async () => {
        request.params = {
          id: 'abc123',
        }

        const err = new Error()
        submittedApplicationService.findApplication.mockImplementation(() => {
          throw err
        })

        const requestHandler = assessmentsController.show()
        await requestHandler(request, response, next)

        expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
          request,
          response,
          err,
          paths.submittedApplications.overview({ id: 'abc123' }),
        )
      })
    })
  })

  describe('update', () => {
    it('updates the assessment and redirects to the application overview page', async () => {
      submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)

      request.body = { assessorName: 'assessor-name', nacroReferralId: 'referral-id' } as UpdateCas2Assessment
      request.params = {
        id: 'abc123',
      }

      const requestHandler = assessmentsController.update()
      await requestHandler(request, response, next)

      expect(assessmentService.updateAssessment).toHaveBeenCalledWith(request.user.token, assessment.id, request.body)
      expect(response.redirect).toHaveBeenCalledWith(paths.submittedApplications.overview({ id: 'abc123' }))
    })

    describe('when there is an error', () => {
      it('passes the error to the error handler', async () => {
        request.params = {
          id: 'abc123',
        }

        const err = new Error()
        assessmentService.updateAssessment.mockImplementation(() => {
          throw err
        })

        const requestHandler = assessmentsController.update()
        await requestHandler(request, response, next)

        expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
          request,
          response,
          err,
          paths.assessmentDetails.show({ id: 'abc123' }),
        )
      })
    })
  })
})
