import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { FullPerson } from '@approved-premises/api'

import { statusUpdateFactory, submittedApplicationFactory } from '../../testutils/factories'
import SubmittedApplicationsController from './submittedApplicationsController'
import { SubmittedApplicationService } from '../../services'
import paths from '../../paths/assess'

describe('submittedApplicationsController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const submittedApplicationService = createMock<SubmittedApplicationService>({})

  let submittedApplicationsController: SubmittedApplicationsController

  const statusUpdate = statusUpdateFactory.build()

  const submittedApplication = submittedApplicationFactory.build({
    submittedBy: { name: 'POM Name' },
    submittedAt: '2023-10-17T08:42:38+01:00',
    statusUpdates: [statusUpdate],
  })

  beforeEach(() => {
    submittedApplicationsController = new SubmittedApplicationsController(submittedApplicationService)

    request = createMock<Request>({ user: { token } })
    response = createMock<Response>({})
  })

  describe('index', () => {
    it('renders existing applications', async () => {
      const applications = [submittedApplication]
      const requestHandler = submittedApplicationsController.index()

      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('assess/applications/index', {
        applications,
        pageHeading: 'Submitted Applications',
      })
    })
  })

  describe('show', () => {
    it('renders the submitted application _show_ template', async () => {
      submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)
      const person = submittedApplication.person as FullPerson

      const requestHandler = submittedApplicationsController.show()
      await requestHandler(request, response, next)

      expect(paths.submittedApplications.show({ id: submittedApplication.id })).toEqual(
        `/assess/applications/${submittedApplication.id}`,
      )

      expect(response.render).toHaveBeenCalledWith('assess/applications/show', {
        application: submittedApplication,
        pageHeading: `Application for ${person.nomsNumber}`,
      })
    })
  })

  describe('overview', () => {
    describe('when there is a status update', () => {
      it('renders the submitted application overview template', async () => {
        submittedApplicationService.findApplication.mockResolvedValue(submittedApplication)

        const requestHandler = submittedApplicationsController.overview()
        await requestHandler(request, response, next)

        expect(paths.submittedApplications.overview({ id: submittedApplication.id })).toEqual(
          `/assess/applications/${submittedApplication.id}/overview`,
        )

        expect(response.render).toHaveBeenCalledWith('assess/applications/overview', {
          application: submittedApplication,
          status: statusUpdate.label,
          pageHeading: `Overview of application`,
        })
      })
    })

    describe('when there is not a status update', () => {
      it('renders the submitted application overview template', async () => {
        const submittedApplicationWithoutStatus = submittedApplicationFactory.build({
          submittedBy: { name: 'POM Name' },
          submittedAt: '2023-10-17T08:42:38+01:00',
          statusUpdates: [],
        })
        submittedApplicationService.findApplication.mockResolvedValue(submittedApplicationWithoutStatus)

        const requestHandler = submittedApplicationsController.overview()
        await requestHandler(request, response, next)

        expect(paths.submittedApplications.overview({ id: submittedApplicationWithoutStatus.id })).toEqual(
          `/assess/applications/${submittedApplicationWithoutStatus.id}/overview`,
        )

        expect(response.render).toHaveBeenCalledWith('assess/applications/overview', {
          application: submittedApplicationWithoutStatus,
          status: 'Received',
          pageHeading: `Overview of application`,
        })
      })
    })
  })
})
