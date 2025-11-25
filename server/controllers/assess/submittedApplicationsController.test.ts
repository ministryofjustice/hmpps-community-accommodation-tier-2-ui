import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { Cas2SubmittedApplicationSummary, FullPerson } from '@approved-premises/api'

import { PaginatedResponse, UiTimelineEvent } from '@approved-premises/ui'
import { faker } from '@faker-js/faker'
import {
  applicationNoteFactory,
  assessmentFactory,
  paginatedResponseFactory,
  submittedApplicationFactory,
} from '../../testutils/factories'
import SubmittedApplicationsController from './submittedApplicationsController'
import { SubmittedApplicationService } from '../../services'
import paths from '../../paths/assess'
import { getPaginationDetails } from '../../utils/getPaginationDetails'
import { catchValidationErrorOrPropogate, fetchErrorsAndUserInput } from '../../utils/validation'
import config from '../../config'
import { assessmentHasExistingData } from '../../utils/assessmentUtils'

jest.mock('../../utils/getPaginationDetails')
jest.mock('../../utils/validation')
jest.mock('../../utils/assessmentUtils')

describe('submittedApplicationsController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const submittedApplicationService = createMock<SubmittedApplicationService>({})

  let submittedApplicationsController: SubmittedApplicationsController

  function createTimelineEvent(occurredAt: string): UiTimelineEvent {
    return {
      label: { text: 'More information requested' },
      byline: { text: 'CAS2 Assessor (NACRO)' },
      datetime: { timestamp: occurredAt, type: 'datetime' },
      html: 'More information requested body',
    }
  }

  beforeEach(() => {
    submittedApplicationsController = new SubmittedApplicationsController(submittedApplicationService)

    request = createMock<Request>({ user: { token } })
    response = createMock<Response>({})
  })

  describe('index', () => {
    const submittedApplication = submittedApplicationFactory.build({
      submittedBy: { name: 'POM Name' },
      submittedAt: '2023-10-17T08:42:38+01:00',
      isTransferredApplication: false,
    })

    it('renders existing applications', async () => {
      const applications = [submittedApplication]

      const paginatedResponse = paginatedResponseFactory.build({
        data: applications,
        totalPages: '50',
        totalResults: '500',
      }) as PaginatedResponse<Cas2SubmittedApplicationSummary>

      const paginationDetails = {
        hrefPrefix: paths.submittedApplications.index({}),
        pageNumber: 1,
      }
      ;(getPaginationDetails as jest.Mock).mockReturnValue(paginationDetails)
      submittedApplicationService.getAll.mockResolvedValue(paginatedResponse)

      const requestHandler = submittedApplicationsController.index()

      await requestHandler(request, response, next)

      expect(submittedApplicationService.getAll).toHaveBeenCalledWith(token, 1)
      expect(response.render).toHaveBeenCalledWith('assess/applications/index', {
        applications,
        pageNumber: 1,
        totalPages: 50,
        hrefPrefix: paths.submittedApplications.index({}),
        pageHeading: 'Submitted Applications',
      })
    })
  })

  describe('show', () => {
    it('renders the submitted application _show_ template', async () => {
      const submittedApplication = submittedApplicationFactory.build({
        submittedBy: { name: 'POM Name' },
        submittedAt: '2023-10-17T08:42:38+01:00',
        isTransferredApplication: false,
      })

      submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)
      const person = submittedApplication.person as FullPerson

      const requestHandler = submittedApplicationsController.show()
      await requestHandler(request, response, next)

      expect(paths.submittedApplications.show({ id: submittedApplication.id })).toEqual(
        `/assess/applications/${submittedApplication.id}`,
      )

      expect(response.render).toHaveBeenCalledWith('assess/applications/show', {
        application: submittedApplication,
        summary: expect.objectContaining({
          id: submittedApplication.id,
          name: person.name,
          prisonNumber: person.nomsNumber,
          prisonName: person.prisonName,
          referrerName: submittedApplication.allocatedPomName,
          contactEmail: submittedApplication.allocatedPomEmailAddress,
          contactNumber: submittedApplication.telephoneNumber,
          isTransferredApplication: false,
          view: 'assessor',
        }),
        pageHeading: `Application for ${person.nomsNumber}`,
      })
    })

    it('renders the submitted application _show_ template when application is transferred', async () => {
      const submittedApplication = submittedApplicationFactory.build({
        submittedBy: { name: 'POM Name' },
        submittedAt: '2023-10-17T08:42:38+01:00',
        assignmentDate: '2025-04-30T10:22:11+01:00',
        isTransferredApplication: true,
      })
      submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)
      const person = submittedApplication.person as FullPerson

      const requestHandler = submittedApplicationsController.show()
      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('assess/applications/show', {
        application: submittedApplication,
        summary: expect.objectContaining({
          id: submittedApplication.id,
          name: person.name,
          contactEmail: submittedApplication.allocatedPomEmailAddress,
          emailLabel: 'Email address:',
          pomAllocation: `${submittedApplication.allocatedPomName}, ${submittedApplication.currentPrisonName}`,
          pomAllocationLabel: 'Prison offender manager (POM) from 30 April 2025:',
          prisonNumber: person.nomsNumber,
          isTransferredApplication: true,
          view: 'assessor',
        }),
        pageHeading: `Application for ${person.nomsNumber}`,
      })
    })
  })

  describe('overview', () => {
    const priorConfigFlags = config.flags

    afterAll(() => {
      config.flags = priorConfigFlags
    })
    ;(assessmentHasExistingData as jest.Mock).mockImplementation(() => {
      return false
    })

    describe('when there is a status update', () => {
      const submittedApplication = submittedApplicationFactory.build({
        submittedBy: { name: 'POM Name' },
        submittedAt: '2023-10-17T08:42:38+01:00',
        assignmentDate: '2025-04-30T10:22:11+01:00',
        isTransferredApplication: true,
      })
      ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
        return { errors: {}, errorSummary: [], userInput: {} }
      })
      it('renders the submitted application overview template', async () => {
        submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)

        const requestHandler = submittedApplicationsController.overview()
        await requestHandler(request, response, next)

        const timelineEvents = [
          createTimelineEvent(submittedApplication.timelineEvents[0].occurredAt),
        ] as UiTimelineEvent[]

        expect(paths.submittedApplications.overview({ id: submittedApplication.id })).toEqual(
          `/assess/applications/${submittedApplication.id}/overview`,
        )

        expect(response.render).toHaveBeenCalledWith('assess/applications/overview', {
          application: submittedApplication,
          status: 'On waiting list',
          statusTagColour: 'yellow',
          timelineEvents,
          errors: {},
          errorSummary: [],
          pageHeading: `Overview of application`,
          actions: [
            {
              text: 'Download as a PDF',
              classes: 'govuk-!-display-none-print',
              attributes: { 'data-print-btn': true },
            },
            {
              text: 'Add assessment details',
              href: paths.assessmentDetails.show({ id: submittedApplication.id }),
              classes: 'govuk-!-display-none-print',
              attributes: {
                'data-testid': 'add-assessment-details',
              },
            },
          ],
        })
      })
    })

    describe('when there is not a status update', () => {
      it('renders the submitted application overview template', async () => {
        const submittedApplicationWithoutStatus = submittedApplicationFactory.build({
          submittedBy: { name: 'POM Name' },
          submittedAt: '2023-10-17T08:42:38+01:00',
          assessment: assessmentFactory.build({ statusUpdates: [] }),
        })
        submittedApplicationService.findApplication.mockResolvedValue(submittedApplicationWithoutStatus)

        const requestHandler = submittedApplicationsController.overview()
        await requestHandler(request, response, next)

        const timelineEvents = [
          createTimelineEvent(submittedApplicationWithoutStatus.timelineEvents[0].occurredAt),
        ] as UiTimelineEvent[]

        expect(paths.submittedApplications.overview({ id: submittedApplicationWithoutStatus.id })).toEqual(
          `/assess/applications/${submittedApplicationWithoutStatus.id}/overview`,
        )

        expect(response.render).toHaveBeenCalledWith('assess/applications/overview', {
          application: submittedApplicationWithoutStatus,
          status: 'Received',
          statusTagColour: 'grey',
          timelineEvents,
          errors: {},
          errorSummary: [],
          pageHeading: `Overview of application`,
          actions: [
            {
              text: 'Download as a PDF',
              classes: 'govuk-!-display-none-print',
              attributes: { 'data-print-btn': true },
            },
            {
              text: 'Add assessment details',
              href: paths.assessmentDetails.show({ id: submittedApplicationWithoutStatus.id }),
              classes: 'govuk-!-display-none-print',
              attributes: {
                'data-testid': 'add-assessment-details',
              },
            },
          ],
        })
      })
    })

    describe('when the assessment has existing data', () => {
      it('renders template', async () => {
        const submittedApplicationWithoutStatus = submittedApplicationFactory.build({
          submittedBy: { name: 'POM Name' },
          submittedAt: '2023-10-17T08:42:38+01:00',
          assessment: assessmentFactory.build({ statusUpdates: [] }),
        })
        submittedApplicationService.findApplication.mockResolvedValue(submittedApplicationWithoutStatus)
        ;(assessmentHasExistingData as jest.Mock).mockImplementation(() => {
          return true
        })

        const timelineEvents = [
          createTimelineEvent(submittedApplicationWithoutStatus.timelineEvents[0].occurredAt),
        ] as UiTimelineEvent[]

        const requestHandler = submittedApplicationsController.overview()
        await requestHandler(request, response, next)

        expect(paths.submittedApplications.overview({ id: submittedApplicationWithoutStatus.id })).toEqual(
          `/assess/applications/${submittedApplicationWithoutStatus.id}/overview`,
        )

        expect(response.render).toHaveBeenCalledWith('assess/applications/overview', {
          application: submittedApplicationWithoutStatus,
          status: 'Received',
          statusTagColour: 'grey',
          timelineEvents,
          errors: {},
          errorSummary: [],
          pageHeading: `Overview of application`,
          actions: [
            {
              text: 'Download as a PDF',
              classes: 'govuk-!-display-none-print',
              attributes: { 'data-print-btn': true },
            },
            {
              text: 'Change assessment details',
              href: paths.assessmentDetails.show({ id: submittedApplicationWithoutStatus.id }),
              classes: 'govuk-!-display-none-print',
              attributes: {
                'data-testid': 'add-assessment-details',
              },
            },
          ],
        })
      })
    })
  })

  describe('addNote', () => {
    describe('when a note is added', () => {
      it('redirects to the overview page with a success message', async () => {
        request.params = {
          id: faker.string.uuid(),
        }

        request.query = {
          applicationId: 'application-id',
        }

        request.body = { note: 'some notes' }

        const note = applicationNoteFactory.build()

        submittedApplicationService.addApplicationNote.mockImplementation(async () => note)

        const requestHandler = submittedApplicationsController.addNote()
        await requestHandler(request, response)

        expect(request.flash).toHaveBeenCalledWith('success', 'Your note was saved.')
        expect(response.redirect).toHaveBeenCalledWith(paths.submittedApplications.overview({ id: 'application-id' }))
      })
    })

    describe('when there is a 400 error ', () => {
      it('adds the error to the flash and redirects back to the page', async () => {
        request.params = {
          id: faker.string.uuid(),
        }

        request.query = {
          applicationId: 'application-id',
        }

        request.body = { note: 'some notes' }

        const err = { data: {}, status: 400 }

        submittedApplicationService.addApplicationNote.mockImplementation(() => {
          throw err
        })

        const requestHandler = submittedApplicationsController.addNote()
        await requestHandler(request, response)
        expect(request.flash).toHaveBeenCalledWith('errors', {
          note: { text: 'Enter a note for the referrer' },
        })
        expect(response.redirect).toHaveBeenCalledWith(paths.submittedApplications.overview({ id: 'application-id' }))
      })
    })

    describe('when there is an error that is not a 400', () => {
      it('passes the error to the error handler', async () => {
        request.params = {
          id: faker.string.uuid(),
        }

        request.query = {
          applicationId: 'application-id',
        }

        request.body = { note: 'some notes' }

        const err = new Error()
        submittedApplicationService.addApplicationNote.mockImplementation(() => {
          throw err
        })

        const requestHandler = submittedApplicationsController.addNote()
        await requestHandler(request, response)
        expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
          request,
          response,
          err,
          paths.submittedApplications.overview({ id: 'application-id' }),
        )
      })
    })
  })
})
