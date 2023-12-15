import type { NextFunction, Request, Response } from 'express'
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { Cas2Application as Application } from '@approved-premises/api'
import { ErrorsAndUserInput, GroupedApplications } from '@approved-premises/ui'
import createHttpError from 'http-errors'

import { getPage } from '../../utils/applications/getPage'
import TaskListPage from '../../form-pages/taskListPage'
import { applicationFactory, applicationSummaryFactory, personFactory } from '../../testutils/factories'
import {
  catchValidationErrorOrPropogate,
  fetchErrorsAndUserInput,
  errorMessage,
  errorSummary as errorSummaryMock,
} from '../../utils/validation'
import ApplicationsController from './applicationsController'
import { PersonService, ApplicationService, TaskListService } from '../../services'
import paths from '../../paths/apply'
import { buildDocument } from '../../utils/applications/documentUtils'

jest.mock('../../utils/validation')
jest.mock('../../services/taskListService')
jest.mock('../../utils/applications/getPage')
jest.mock('../../utils/applications/documentUtils')

describe('applicationsController', () => {
  const token = 'SOME_TOKEN'

  let request: DeepMocked<Request> = createMock<Request>({ user: { token } })
  let response: DeepMocked<Response> = createMock<Response>({})
  const next: DeepMocked<NextFunction> = jest.fn()

  const personService = createMock<PersonService>({})
  const applicationService = createMock<ApplicationService>({})

  let applicationsController: ApplicationsController

  const applications = { inProgress: applicationSummaryFactory.buildList(3), submitted: [] } as GroupedApplications

  applicationService.getAllForLoggedInUser.mockResolvedValue(applications)

  beforeEach(() => {
    applicationsController = new ApplicationsController(personService, applicationService, {
      personService,
      applicationService,
    })

    request = createMock<Request>({
      user: { token },
      headers: {
        referer: 'some-referrer/',
      },
    })
    response = createMock<Response>({})
  })

  describe('index', () => {
    it('renders existing applications', async () => {
      ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
        return { errors: {}, errorSummary: [], userInput: {} }
      })

      const requestHandler = applicationsController.index()

      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith('applications/index', {
        errors: {},
        errorSummary: [],
        applications,
        pageHeading: 'Applications',
      })
    })
  })

  describe('show', () => {
    describe('when application is submitted', () => {
      it('renders the submitted view', async () => {
        const submittedApplication = applicationFactory.build({ submittedAt: new Date().toISOString() })
        applicationService.findApplication.mockResolvedValue(submittedApplication)

        const requestHandler = applicationsController.show()
        await requestHandler(request, response, next)

        expect(response.render).toHaveBeenCalledWith('applications/show', {
          application: submittedApplication,
        })
      })
    })
    describe('when "Confirm eligibility" and "confirm consent" tasks are complete', () => {
      describe('and the person is confirmed eligible and has given consent', () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'yes' },
            },
            'confirm-consent': {
              'confirm-consent': {
                hasGivenConsent: 'yes',
                consentDate: '2022-02-22',
                'consentDate-year': '2022',
                'consentDate-month': '2',
                'consentDate-day': '22',
              },
            },
          },
        })
        it('renders the task list view', async () => {
          const stubTaskList = jest.fn()
          applicationService.findApplication.mockResolvedValue(application)
          ;(TaskListService as jest.Mock).mockImplementation(() => {
            return stubTaskList
          })
          ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
            return { errors: {}, errorSummary: [], userInput: {} }
          })

          const requestHandler = applicationsController.show()
          await requestHandler(request, response, next)

          expect(response.render).toHaveBeenCalledWith('applications/taskList', {
            application,
            taskList: stubTaskList,
            errors: {},
            errorSummary: [],
            referrer: 'some-referrer/',
          })
        })

        it('renders the task list view with errors', async () => {
          const stubTaskList = jest.fn()
          applicationService.findApplication.mockResolvedValue(application)
          ;(TaskListService as jest.Mock).mockImplementation(() => {
            return stubTaskList
          })

          const errorSummary = [{ text: 'Error text' }]
          ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
            return { errors: {}, errorSummary, userInput: {} }
          })

          const requestHandler = applicationsController.show()
          await requestHandler(request, response, next)

          expect(response.render).toHaveBeenCalledWith('applications/taskList', {
            application,
            taskList: stubTaskList,
            errors: {},
            errorSummary,
            referrer: 'some-referrer/',
          })
        })
      })

      describe('and the person is confirmed INELIGIBLE', () => {
        it('renders the _ineligible_ page', async () => {
          const application = applicationFactory.build({
            person: personFactory.build({ name: 'Roger Smith' }),
            data: {
              'confirm-eligibility': {
                'confirm-eligibility': { isEligible: 'no' },
              },
            },
          })

          const panelText = `Roger Smith is not eligible for CAS-2 accommodation`
          const changeAnswerPath = paths.applications.pages.show({
            id: application.id,
            task: 'confirm-eligibility',
            page: 'confirm-eligibility',
          })
          const newApplicationPath = paths.applications.new({})

          applicationService.findApplication.mockResolvedValue(application)

          const requestHandler = applicationsController.show()
          await requestHandler(request, response, next)

          expect(response.render).toHaveBeenCalledWith('applications/ineligible', {
            application,
            panelText,
            changeAnswerPath,
            newApplicationPath,
          })
        })
      })
    })

    describe('when "Confirm eligibility" task is NOT complete', () => {
      it('renders "Confirm eligibility" page from the "Before you start" section', async () => {
        const application = applicationFactory.build({ data: {} })
        applicationService.findApplication.mockResolvedValue(application)

        const requestHandler = applicationsController.show()
        await requestHandler(request, response, next)

        expect(response.redirect).toHaveBeenCalledWith(
          paths.applications.pages.show({
            id: application.id,
            task: 'confirm-eligibility',
            page: 'confirm-eligibility',
          }),
        )
      })
    })

    describe('when the person is confirmed ELIGIBLE but consent has been DENIED', () => {
      it('renders the _consent refused_ page', async () => {
        const application = applicationFactory.build({
          person: personFactory.build({ name: 'Roger Smith' }),
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'yes' },
            },
            'confirm-consent': {
              'confirm-consent': {
                hasGivenConsent: 'no',
                consentRefusalDetail: 'some reason',
              },
            },
          },
        })

        const panelText = `Roger Smith has not given their consent`
        const changeAnswerPath = paths.applications.pages.show({
          id: application.id,
          task: 'confirm-consent',
          page: 'confirm-consent',
        })
        const newApplicationPath = paths.applications.new({})

        applicationService.findApplication.mockResolvedValue(application)

        const requestHandler = applicationsController.show()
        await requestHandler(request, response, next)

        expect(response.render).toHaveBeenCalledWith('applications/consent-refused', {
          application,
          panelText,
          changeAnswerPath,
          newApplicationPath,
          backLink: 'some-referrer/',
        })
      })
    })

    describe('when the person is confirmed ELIGIBLE but the consent task has not been completed', () => {
      it('redirects to the _confirm consent_ page', async () => {
        const application = applicationFactory.build({
          person: personFactory.build({ name: 'Roger Smith' }),
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'yes' },
            },
          },
        })

        applicationService.findApplication.mockResolvedValue(application)

        const requestHandler = applicationsController.show()
        await requestHandler(request, response, next)

        expect(response.redirect).toHaveBeenCalledWith(
          paths.applications.pages.show({
            id: application.id,
            task: 'confirm-consent',
            page: 'confirm-consent',
          }),
        )
      })
    })

    describe('create', () => {
      it('redirects to the new applications page on success', async () => {
        request.body = {
          crn: 'crn123',
          prisonNumber: 'prisonNumber123',
        }

        applicationService.createApplication.mockResolvedValue({} as Application)

        const requestHandler = applicationsController.create()
        await requestHandler(request, response, next)

        expect(response.redirect).toHaveBeenCalledWith(paths.applications.new({}))
      })

      it('handles a not found error if person not found', async () => {
        request.body = {
          crn: 'crn123',
          prisonNumber: 'prisonNumber123',
        }

        const requestHandler = applicationsController.create()

        const err = createHttpError(404)

        applicationService.createApplication.mockImplementation(() => {
          throw err
        })

        await requestHandler(request, response, next)

        expect(errorSummaryMock).toHaveBeenCalledWith(
          'prisonNumber',
          'No person found for prison number prisonNumber123, please try another number.',
        )

        expect(errorMessage).toHaveBeenCalledWith(
          'prisonNumber',
          'No person found for prison number prisonNumber123, please try another number.',
        )

        expect(response.redirect).toHaveBeenCalledWith(paths.applications.new({}))
      })

      it('handles a forbidden error if person forbidden', async () => {
        request.body = {
          crn: 'crn123',
          prisonNumber: 'prisonNumber123',
        }

        const requestHandler = applicationsController.create()

        const err = createHttpError(403)

        applicationService.createApplication.mockImplementation(() => {
          throw err
        })

        await requestHandler(request, response, next)

        expect(errorSummaryMock).toHaveBeenCalledWith(
          'prisonNumber',
          'You do not have permission to access the prison number prisonNumber123, please try another number.',
        )

        expect(errorMessage).toHaveBeenCalledWith(
          'prisonNumber',
          'You do not have permission to access the prison number prisonNumber123, please try another number.',
        )

        expect(response.redirect).toHaveBeenCalledWith(paths.applications.new({}))
      })

      it('throws a generic error if createApplication returns server error', async () => {
        const requestHandler = applicationsController.create()

        const err = new Error()

        applicationService.createApplication.mockImplementation(() => {
          throw err
        })

        await requestHandler(request, response, next)

        expect(response.redirect).toHaveBeenCalledWith(paths.applications.new({}))
      })
    })

    describe('new', () => {
      it('renders the enter CRN template', async () => {
        ;(fetchErrorsAndUserInput as jest.Mock).mockImplementation(() => {
          return { errors: {}, errorSummary: [], userInput: {} }
        })

        const requestHandler = applicationsController.new()
        await requestHandler(request, response, next)

        expect(response.render).toHaveBeenCalledWith('applications/new', {
          errors: {},
          errorSummary: [],
          pageHeading: "Enter the person's prison number",
        })
      })

      it('renders the form with errors and user input if an error has been sent to the flash', async () => {
        const errorsAndUserInput = createMock<ErrorsAndUserInput>()
        ;(fetchErrorsAndUserInput as jest.Mock).mockReturnValue(errorsAndUserInput)

        const requestHandler = applicationsController.new()
        await requestHandler(request, response, next)

        expect(response.render).toHaveBeenCalledWith('applications/new', {
          pageHeading: "Enter the person's prison number",
          errors: errorsAndUserInput.errors,
          errorSummary: errorsAndUserInput.errorSummary,
          ...errorsAndUserInput.userInput,
        })
      })
    })

    describe('submit', () => {
      describe('when the confirmation checkbox is checked', () => {
        it('renders the application submission confirmation page', async () => {
          const application = applicationFactory.build()

          ;(buildDocument as jest.Mock).mockReturnValue({})

          request.params.id = 'some-id'
          request.body = { confirmation: 'submit' }

          applicationService.findApplication.mockResolvedValue(application)

          const requestHandler = applicationsController.submit()
          await requestHandler(request, response, next)

          expect(applicationService.findApplication).toHaveBeenCalledWith(request.user.token, request.params.id)
          expect(applicationService.submit).toHaveBeenCalledWith(request.user.token, application)
          expect(response.render).toHaveBeenCalledWith('applications/confirm', {
            pageHeading: 'Application confirmation',
            application,
          })
        })
      })

      describe('when the confirmation checkbox is not checked', () => {
        it('renders the application submission confirmation page', async () => {
          const application = applicationFactory.build()

          ;(buildDocument as jest.Mock).mockReturnValue({})

          request.params.id = 'some-id'
          request.body = undefined

          applicationService.findApplication.mockResolvedValue(application)

          const requestHandler = applicationsController.submit()
          await requestHandler(request, response, next)

          const error = new Error('You must confirm the information provided is complete, accurate and up to date.')

          expect(applicationService.findApplication).toHaveBeenCalledWith(request.user.token, request.params.id)
          expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
            request,
            response,
            error,
            paths.applications.show({ id: application.id }),
          )
        })
      })
    })

    describe('appendToList', () => {
      const page = createMock<TaskListPage>({})

      beforeEach(() => {
        request.body = {
          exampleField: 'example answer',
        }
        request.query = {}
        request.params = {
          id: 'abc123',
          page: 'example-page',
          task: 'example-task',
        }

        const PageConstructor = jest.fn()
        ;(getPage as jest.Mock).mockReturnValue(PageConstructor)

        applicationService.initializePage.mockResolvedValue(page)
      })

      describe('when there is a redirect path', () => {
        it('redirects to that path', async () => {
          request.query = {
            redirectPage: 'redirect-page',
          }

          applicationService.appendToList.mockResolvedValue()

          const requestHandler = applicationsController.appendToList()

          await requestHandler({ ...request }, response)

          expect(applicationService.appendToList).toHaveBeenCalledWith(page, request)

          expect(response.redirect).toHaveBeenCalledWith('/applications/abc123/tasks/example-task/pages/redirect-page')
        })
      })

      describe('when the page has a next page', () => {
        it('saves data and calls next function', async () => {
          page.next.mockReturnValue('next-page')

          applicationService.appendToList.mockResolvedValue()

          const requestHandler = applicationsController.appendToList()

          await requestHandler({ ...request }, response)

          expect(applicationService.appendToList).toHaveBeenCalledWith(page, request)

          expect(response.redirect).toHaveBeenCalledWith(
            paths.applications.pages.show({ id: request.params.id, task: 'example-task', page: 'next-page' }),
          )
        })
      })

      describe('when the page does not have a next page', () => {
        it('redirects to the task list page', async () => {
          page.next.mockReturnValue('')

          applicationService.appendToList.mockResolvedValue()

          const requestHandler = applicationsController.appendToList()

          await requestHandler({ ...request }, response)

          expect(applicationService.appendToList).toHaveBeenCalledWith(page, request)

          expect(response.redirect).toHaveBeenCalledWith(paths.applications.show({ id: request.params.id }))
        })
      })

      describe('when there are errors', () => {
        it('passes error to error handler', async () => {
          const err = new Error()
          applicationService.appendToList.mockImplementation(() => {
            throw err
          })

          const requestHandler = applicationsController.appendToList()

          await requestHandler({ ...request }, response)

          expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
            request,
            response,
            err,
            paths.applications.pages.show({ id: request.params.id, task: 'example-task', page: 'example-page' }),
          )
        })
      })
    })

    describe('removeFromList', () => {
      const page = createMock<TaskListPage>({})

      beforeEach(() => {
        request.query = {
          redirectPage: 'return-page',
        }
        request.params = {
          id: 'abc123',
          task: 'example-task',
          page: 'example-page',
          index: '0',
        }

        const PageConstructor = jest.fn()
        ;(getPage as jest.Mock).mockReturnValue(PageConstructor)

        applicationService.initializePage.mockResolvedValue(page)
      })

      describe('when item is successfully removed', () => {
        it('renders the page', async () => {
          applicationService.removeFromList.mockResolvedValue()

          const requestHandler = applicationsController.removeFromList()

          await requestHandler({ ...request }, response)

          expect(applicationService.removeFromList).toHaveBeenCalledWith(request)

          expect(response.redirect).toHaveBeenCalledWith(
            paths.applications.pages.show({ id: request.params.id, task: 'example-task', page: 'return-page' }),
          )
        })
      })

      describe('when an error occurs', () => {
        it('passes error to error handler', async () => {
          const err = new Error()
          applicationService.removeFromList.mockImplementation(() => {
            throw err
          })

          const requestHandler = applicationsController.removeFromList()

          await requestHandler({ ...request }, response)

          expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
            request,
            response,
            err,
            paths.applications.pages.show({ id: request.params.id, task: 'example-task', page: 'return-page' }),
          )
        })
      })
    })

    describe('update', () => {
      const page = createMock<TaskListPage>({})

      const taskData = `{
      "example-task": {
        "example-page": {
          "exmaplePageQuestion": "example text"
        }
      }
    }`

      beforeEach(() => {
        request.body = {
          taskData,
          pageName: 'example-page',
          taskName: 'example-task',
        }

        request.params = {
          id: 'abc123',
        }

        const PageConstructor = jest.fn()
        ;(getPage as jest.Mock).mockReturnValue(PageConstructor)

        applicationService.initializePage.mockResolvedValue(page)
      })

      describe('when the page has a next page', () => {
        it('saves data and calls next function', async () => {
          page.next.mockReturnValue('next-page')

          applicationService.saveData.mockResolvedValue()

          const requestHandler = applicationsController.update()

          await requestHandler({ ...request }, response, next)

          expect(applicationService.saveData).toHaveBeenCalledWith(JSON.parse(taskData), request)

          expect(response.redirect).toHaveBeenCalledWith(
            paths.applications.pages.show({ id: request.params.id, task: 'example-task', page: 'next-page' }),
          )
        })
      })
      describe('when the page does not have a next page', () => {
        it('redirects to the task list page', async () => {
          page.next.mockReturnValue('')

          applicationService.saveData.mockResolvedValue()

          const requestHandler = applicationsController.update()

          await requestHandler({ ...request }, response, next)

          expect(applicationService.saveData).toHaveBeenCalledWith(JSON.parse(taskData), request)

          expect(response.redirect).toHaveBeenCalledWith(paths.applications.show({ id: request.params.id }))
        })
      })

      describe('when there are errors', () => {
        it('passes error to error handler', async () => {
          const err = new Error()
          applicationService.saveData.mockImplementation(() => {
            throw err
          })

          const requestHandler = applicationsController.update()

          await requestHandler({ ...request }, response, next)

          expect(catchValidationErrorOrPropogate).toHaveBeenCalledWith(
            request,
            response,
            err,
            paths.applications.pages.show({ id: request.params.id, task: 'example-task', page: 'example-page' }),
          )
        })
      })
    })
  })
})
