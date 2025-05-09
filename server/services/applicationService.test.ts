import { DeepMocked, createMock } from '@golevelup/ts-jest'
import type { Request } from 'express'
import { Cas2ApplicationSummary, SubmitCas2Application } from '@approved-premises/api'
import { UpdateCas2Application } from 'server/@types/shared/models/UpdateCas2Application'
import { DataServices, GroupedApplications, TaskListErrors, PaginatedResponse } from '@approved-premises/ui'
import ApplicationService from './applicationService'
import ApplicationClient from '../data/applicationClient'
import TaskListPage, { TaskListPageInterface } from '../form-pages/taskListPage'
import { getBody, getPageName, getTaskName, pageBodyShallowEquals } from '../form-pages/utils'
import { ValidationError } from '../utils/errors'
import { getApplicationSubmissionData, getApplicationUpdateData } from '../utils/applications/getApplicationData'
import CheckYourAnswers from '../form-pages/apply/check-your-answers/check-your-answers/checkYourAnswers'

import { applicationFactory, applicationSummaryFactory, paginatedResponseFactory } from '../testutils/factories'
import applyPaths from '../paths/apply'
import { DateFormats } from '../utils/dateUtils'
import { getStatusTag } from '../utils/applicationUtils'

jest.mock('../data/applicationClient.ts')
jest.mock('../data/personClient.ts')
jest.mock('../form-pages/utils')
jest.mock('../utils/applications/getApplicationData')

describe('ApplicationService', () => {
  const applicationClient = new ApplicationClient(null) as jest.Mocked<ApplicationClient>
  const applicationClientFactory = jest.fn()

  const service = new ApplicationService(applicationClientFactory)

  beforeEach(() => {
    jest.resetAllMocks()
    applicationClientFactory.mockReturnValue(applicationClient)
  })

  describe('createApplication', () => {
    it('calls the create method and returns an application', async () => {
      const application = applicationFactory.build()

      const token = 'SOME_TOKEN'

      applicationClient.create.mockResolvedValue(application)

      const result = await service.createApplication(token, application.person.crn)

      expect(result).toEqual(application)

      expect(applicationClientFactory).toHaveBeenCalledWith(token)
      expect(applicationClient.create).toHaveBeenCalledWith(application.person.crn)
    })
  })

  describe('findApplication', () => {
    it('calls the find method and returns an application', async () => {
      const application = applicationFactory.build()
      const token = 'SOME_TOKEN'

      applicationClient.find.mockResolvedValue(application)

      const result = await service.findApplication(token, application.id)

      expect(result).toEqual(application)

      expect(applicationClientFactory).toHaveBeenCalledWith(token)
      expect(applicationClient.find).toHaveBeenCalledWith(application.id)
    })
  })

  describe('getAllForLoggedInUser', () => {
    const token = 'SOME_TOKEN'
    const applications: GroupedApplications = {
      inProgress: applicationSummaryFactory.buildList(1, { status: 'inProgress', latestStatusUpdate: null }),
      submitted: applicationSummaryFactory.buildList(1, { status: 'submitted' }),
      transferredOut: applicationSummaryFactory.buildList(1, { status: 'submitted' }),
    }

    it('fetches all applications', async () => {
      applicationClient.getApplicationsForUser.mockImplementation(arg => {
        if (arg === 'IN_PROGRESS') {
          return Promise.resolve(Object.values(applications.inProgress).flat())
        }
        if (arg === 'PRISON') {
          return Promise.resolve(Object.values(applications.submitted).flat())
        }
        if (arg === 'DEALLOCATED') {
          return Promise.resolve(Object.values(applications.transferredOut).flat())
        }
        return Promise.resolve([])
      })

      const result = await service.getAllForLoggedInUser(token)

      expect(result).toEqual({
        inProgress: applications.inProgress,
        submitted: applications.submitted,
        transferredOut: applications.transferredOut,
      })

      expect(applicationClientFactory).toHaveBeenCalledWith(token)
    })
  })

  describe('getAllByPrison', () => {
    const token = 'SOME_TOKEN'

    it('fetches all applications for a prison', async () => {
      const applications = applicationSummaryFactory.buildList(3)

      const paginatedResponse = paginatedResponseFactory.build({
        data: applications,
        totalPages: '50',
        totalResults: '500',
        pageNumber: '2',
      }) as PaginatedResponse<Cas2ApplicationSummary>

      applicationClient.getApplicationsForPrison.mockResolvedValue(paginatedResponse)

      const result = await service.getAllByPrison(token, '123', 2)

      expect(result.data).toEqual(applications)
      expect(result.pageNumber).toEqual('2')
      expect(result.pageSize).toEqual('10')
      expect(result.totalPages).toEqual('50')
      expect(result.totalResults).toEqual('500')

      expect(applicationClientFactory).toHaveBeenCalledWith(token)
      expect(applicationClient.getApplicationsForPrison).toHaveBeenCalledWith('123', 2, 'PRISON')
    })
  })

  describe('getPrisonNewTransferredIn', () => {
    const token = 'SOME_TOKEN'

    it('fetches all transferred in applications that are not allocated to a POM for a given prison', async () => {
      const applications = applicationSummaryFactory.buildList(3)

      const newData = applications.map(application => {
        return [
          {
            html: `<a href=${applyPaths.applications.overview({ id: application.id })} data-cy-id="unallocatedId-${application.id}">${application.personName}</a>`,
          },
          { text: application.nomsNumber },
          application.hdcEligibilityDate
            ? { text: DateFormats.isoDateToUIDate(application.hdcEligibilityDate, { format: 'medium' }) }
            : { text: undefined },
          { html: getStatusTag(application.latestStatusUpdate?.label, application.latestStatusUpdate?.statusId) },
        ]
      })

      const paginatedResponse = paginatedResponseFactory.build({
        data: applications,
        totalPages: '50',
        totalResults: '500',
        pageNumber: '2',
      }) as PaginatedResponse<Cas2ApplicationSummary>

      applicationClient.getApplicationsForPrison.mockResolvedValue(paginatedResponse)

      const result = await service.getPrisonNewTransferredIn(token, '123', 2)

      expect(result.data).toEqual(newData)
      expect(result.pageNumber).toEqual('2')
      expect(result.pageSize).toEqual('10')
      expect(result.totalPages).toEqual('50')
      expect(result.totalResults).toEqual('500')

      expect(applicationClientFactory).toHaveBeenCalledWith(token)
      expect(applicationClient.getApplicationsForPrison).toHaveBeenCalledWith('123', 2, 'UNALLOCATED')
    })
  })

  describe('save', () => {
    const application = applicationFactory.build({ data: null })
    const token = 'some-token'
    const request = createMock<Request>({
      params: { id: application.id, task: 'some-task', page: 'some-page' },
      user: { token },
    })
    const applicationData = createMock<UpdateCas2Application>()

    beforeEach(() => {
      applicationClient.find.mockResolvedValue(application)
    })

    describe('when there are no validation errors', () => {
      let page: DeepMocked<TaskListPage>

      beforeEach(() => {
        page = createMock<TaskListPage>({
          errors: () => {
            return {} as TaskListErrors<TaskListPage>
          },
          body: { foo: 'bar' },
        })
        ;(getPageName as jest.Mock).mockImplementation(pageClass =>
          pageClass === CheckYourAnswers ? 'check-your-answers' : 'some-page',
        )
        ;(getTaskName as jest.Mock).mockImplementation(pageClass =>
          pageClass === CheckYourAnswers ? 'check-your-answers' : 'some-task',
        )
        ;(pageBodyShallowEquals as jest.Mock).mockReturnValue(false)
      })

      it('does not throw an error', () => {
        expect(async () => {
          await service.save(page, request)
        }).not.toThrow(ValidationError)
      })

      it('saves data to the api', async () => {
        await service.save(page, request)

        expect(applicationClientFactory).toHaveBeenCalledWith(token)
        expect(applicationClient.update).toHaveBeenCalledWith(application.id, applicationData)
      })

      it('calls "onSave" if the page has it defined', async () => {
        const onSaveMock = jest.fn()

        page = createMock<TaskListPage>({
          errors: () => {
            return {} as TaskListErrors<TaskListPage>
          },
          body: { foo: 'bar' },
          onSave: onSaveMock,
        })

        await service.save(page, request)

        expect(onSaveMock).toHaveBeenCalled()
      })

      it('updates an in-progress application', async () => {
        application.data = { 'some-task': { 'other-page': { question: 'answer' } } }

        await service.save(page, request)

        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'some-task': {
              'other-page': { question: 'answer' },
              'some-page': { foo: 'bar' },
            },
          },
        })
      })

      it('invalidates the check your answers task when saving a new page', async () => {
        application.data = {
          'some-task': { 'other-page': { question: 'answer' } },
          'check-your-answers': { 'check-your-answers': { reviewed: '1' } },
        }

        await service.save(page, request)

        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'some-task': { 'other-page': { question: 'answer' }, 'some-page': { foo: 'bar' } },
          },
        })
      })

      it('invalidates the check your answers task when changing an existing page', async () => {
        application.data = {
          'some-task': { 'some-page': { foo: 'baz' }, 'other-page': { question: 'answer' } },
          'check-your-answers': { review: { reviewed: '1' } },
        }

        await service.save(page, request)

        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'some-task': { 'other-page': { question: 'answer' }, 'some-page': { foo: 'bar' } },
          },
        })
      })

      it('does not invalidate the check your answers task when saving an existing page with unchanged data', async () => {
        application.data = {
          'some-task': { 'some-page': { foo: 'bar' } },
          'check-your-answers': { review: { reviewed: '1' } },
        }
        ;(pageBodyShallowEquals as jest.Mock).mockReturnValue(true)

        await service.save(page, request)

        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'some-task': { 'some-page': { foo: 'bar' } },
            'check-your-answers': { review: { reviewed: '1' } },
          },
        })
      })

      it('does not invalidate the check your answers task when saving a check your answers page', async () => {
        page = createMock<TaskListPage>({
          errors: () => {
            return {} as TaskListErrors<TaskListPage>
          },
          body: { reviewed: '1' },
        })

        application.data = {
          'some-task': { 'other-page': { question: 'answer' } },
        }
        ;(getTaskName as jest.Mock).mockReturnValue('check-your-answers')
        ;(getPageName as jest.Mock).mockReturnValue('check-your-answers')

        await service.save(page, request)

        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'some-task': {
              'other-page': { question: 'answer' },
            },
            'check-your-answers': { 'check-your-answers': { reviewed: '1' } },
          },
        })
      })

      it('deletes conditional data if required for funding information', async () => {
        page = createMock<TaskListPage>({
          errors: () => {
            return {} as TaskListErrors<TaskListPage>
          },
          body: { fundingSource: 'personalSavings' },
        })
        ;(getPageName as jest.Mock).mockImplementation(() => 'funding-source')
        ;(getTaskName as jest.Mock).mockImplementation(() => 'funding-information')

        application.data = {
          'funding-information': {
            identification: { question: 'answer' },
            'alternative-identification': { question: 'answer' },
          },
        }

        await service.save(page, request)

        expect(applicationClientFactory).toHaveBeenCalledWith(token)
        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'funding-information': { 'funding-source': { fundingSource: 'personalSavings' } },
          },
        })
      })

      it('deletes conditional data if required for equality and diversity information', async () => {
        page = createMock<TaskListPage>({
          errors: () => {
            return {} as TaskListErrors<TaskListPage>
          },
          body: { willAnswer: 'no' },
        })
        ;(getPageName as jest.Mock).mockImplementation(() => 'will-answer-equality-questions')
        ;(getTaskName as jest.Mock).mockImplementation(() => 'equality-and-diversity-monitoring')

        application.data = {
          'equality-and-diversity-monitoring': {
            'will-answer-equality-questions': {
              willAnswer: 'no',
            },
            disability: {
              hasDisability: 'no',
            },
          },
        }

        await service.save(page, request)

        expect(applicationClientFactory).toHaveBeenCalledWith(token)
        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'equality-and-diversity-monitoring': {
              'will-answer-equality-questions': {
                willAnswer: 'no',
              },
            },
          },
        })
      })

      it('deletes conditional data if required for offence history data', async () => {
        page = createMock<TaskListPage>({
          errors: () => {
            return {} as TaskListErrors<TaskListPage>
          },
          body: { hasAnyPreviousConvictions: 'no' },
        })
        ;(getPageName as jest.Mock).mockImplementation(() => 'any-previous-convictions')
        ;(getTaskName as jest.Mock).mockImplementation(() => 'offending-history')

        application.data = {
          'offending-history': {
            'any-previous-convictions': {
              hasAnyPreviousConvictions: 'no',
            },
            'offence-history-data': [{ example: 'example' }],
          },
        }

        await service.save(page, request)

        expect(applicationClientFactory).toHaveBeenCalledWith(token)
        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'offending-history': {
              'any-previous-convictions': {
                hasAnyPreviousConvictions: 'no',
              },
            },
          },
        })
      })

      describe('when there is address history data', () => {
        it('deletes last known address if there is now a known previous address ', async () => {
          page = createMock<TaskListPage>({
            errors: () => {
              return {} as TaskListErrors<TaskListPage>
            },
            body: {
              hasPreviousAddress: 'yes',
            },
          })
          ;(getTaskName as jest.Mock).mockImplementation(() => 'address-history')
          ;(getPageName as jest.Mock).mockImplementation(() => 'previous-address')

          application.data = {
            'address-history': {
              'previous-address': {
                hasPreviousAddress: 'no',
                howLong: '1',
                lastKnownAddressLine1: '1',
                lastKnownAddressLine2: '1',
                lastKnownTownOrCity: '1',
                lastKnownCounty: '1',
                lastKnownPostcode: '1',
              },
            },
          }

          await service.save(page, request)

          expect(applicationClientFactory).toHaveBeenCalledWith(token)
          expect(getApplicationUpdateData).toHaveBeenCalledWith({
            ...application,
            data: {
              'address-history': {
                'previous-address': {
                  hasPreviousAddress: 'yes',
                },
              },
            },
          })
        })
        it('deletes previous address if they no longer have a previous address ', async () => {
          page = createMock<TaskListPage>({
            errors: () => {
              return {} as TaskListErrors<TaskListPage>
            },
            body: {
              hasPreviousAddress: 'no',
            },
          })
          ;(getTaskName as jest.Mock).mockImplementation(() => 'address-history')
          ;(getPageName as jest.Mock).mockImplementation(() => 'previous-address')

          application.data = {
            'address-history': {
              'previous-address': {
                hasPreviousAddress: 'no',
                previousAddressLine1: '1',
                previousAddressLine2: '1',
                previousTownOrCity: '1',
                previousCounty: '1',
                previousPostcode: '1',
              },
            },
          }

          await service.save(page, request)

          expect(applicationClientFactory).toHaveBeenCalledWith(token)
          expect(getApplicationUpdateData).toHaveBeenCalledWith({
            ...application,
            data: {
              'address-history': {
                'previous-address': {
                  hasPreviousAddress: 'no',
                },
              },
            },
          })
        })
      })
    })

    describe('When there validation errors', () => {
      it('throws an error if there is a validation error', async () => {
        const errors = createMock<TaskListErrors<TaskListPage>>({ knowOralHearingDate: 'error' })
        const page = createMock<TaskListPage>({
          errors: () => errors,
        })

        expect.assertions(1)
        try {
          await service.save(page, request)
        } catch (e) {
          expect(e).toEqual(new ValidationError(errors))
        }
      })
    })
  })

  describe('appendToList', () => {
    const application = applicationFactory.build({ data: null })
    const token = 'some-token'
    const request = createMock<Request>({
      params: { id: application.id, task: 'some-task', page: 'some-page' },
      user: { token },
    })
    const applicationData = createMock<UpdateCas2Application>()

    beforeEach(() => {
      applicationClient.find.mockResolvedValue(application)
    })

    describe('when there are no validation errors', () => {
      let page: DeepMocked<TaskListPage>

      beforeEach(() => {
        page = createMock<TaskListPage>({
          errors: () => {
            return {} as TaskListErrors<TaskListPage>
          },
          body: { foo: 'bar' },
        })
        ;(getPageName as jest.Mock).mockReturnValue('some-page')
        ;(getTaskName as jest.Mock).mockReturnValue('some-task')
      })

      it('does not throw an error', () => {
        expect(async () => {
          await service.appendToList(page, request)
        }).not.toThrow(ValidationError)
      })

      it('saves data to the api', async () => {
        await service.appendToList(page, request)

        expect(applicationClientFactory).toHaveBeenCalledWith(token)
        expect(applicationClient.update).toHaveBeenCalledWith(application.id, applicationData)
      })

      it('updates an in-progress application', async () => {
        application.data = { 'some-task': { 'some-page': [{ question: 'answer' }] } }
        const requestWithBody = createMock<Request>({
          body: { newQuestion: 'new answer' },
          params: { id: application.id, task: 'some-task', page: 'some-page' },
          user: { token },
        })

        await service.appendToList(page, requestWithBody)

        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'some-task': {
              'some-page': [{ question: 'answer' }, { newQuestion: 'new answer' }],
            },
          },
        })
      })
    })

    describe('When there validation errors', () => {
      it('throws an error if there is a validation error', async () => {
        const errors = createMock<TaskListErrors<TaskListPage>>({ knowOralHearingDate: 'error' })
        const page = createMock<TaskListPage>({
          errors: () => errors,
        })

        expect.assertions(1)
        try {
          await service.appendToList(page, request)
        } catch (e) {
          expect(e).toEqual(new ValidationError(errors))
        }
      })
    })
  })

  describe('removeFromList', () => {
    const application = applicationFactory.build({ data: null })
    const token = 'some-token'
    const request = createMock<Request>({
      query: { redirectPage: 'return-page' },
      params: { id: application.id, task: 'some-task', page: 'some-page', index: '1' },
      user: { token },
    })
    const applicationData = createMock<UpdateCas2Application>()

    beforeEach(() => {
      applicationClient.find.mockResolvedValue(application)
    })

    describe('when there is no list to remove from ', () => {
      it('does not update the application', async () => {
        await service.removeFromList(request)

        expect(applicationClient.update).not.toHaveBeenCalled()
      })
    })

    describe('when there is a list to remove from ', () => {
      it('updates an in-progress application', async () => {
        application.data = {
          'some-task': {
            'some-page': [
              { question: 'answer to be kept' },
              { question: 'answer to be deleted' },
              { question: 'another answer to be kept' },
            ],
          },
        }

        await service.removeFromList(request)

        expect(getApplicationUpdateData).toHaveBeenCalledWith({
          ...application,
          data: {
            'some-task': {
              'some-page': [{ question: 'answer to be kept' }, { question: 'another answer to be kept' }],
            },
          },
        })
        expect(applicationClient.update).toHaveBeenCalledWith(application.id, applicationData)
      })
    })
  })

  describe('initializePage', () => {
    let request: DeepMocked<Request>

    const dataServices = createMock<DataServices>({}) as DataServices
    const application = applicationFactory.build()
    const Page = jest.fn()

    beforeEach(() => {
      applicationClient.find.mockResolvedValue(application)

      request = createMock<Request>({
        params: { id: application.id, task: 'my-task', page: 'first' },
        session: { previousPage: '' },
        user: { token: 'some-token' },
      })
    })

    it('should fetch the application from the API if it is not in the session', async () => {
      ;(getBody as jest.Mock).mockReturnValue(request.body)

      const result = await service.initializePage(Page, request, dataServices)

      expect(result).toBeInstanceOf(Page)

      expect(Page).toHaveBeenCalledWith(request.body, application, '')
      expect(applicationClient.find).toHaveBeenCalledWith(request.params.id)
    })

    it('should return the session and a page from a page list', async () => {
      ;(getBody as jest.Mock).mockReturnValue(request.body)

      const result = await service.initializePage(Page, request, dataServices)

      expect(result).toBeInstanceOf(Page)

      expect(Page).toHaveBeenCalledWith(request.body, application, '')
    })

    it('should initialize the page with the session and the userInput if specified', async () => {
      const userInput = { foo: 'bar' }
      ;(getBody as jest.Mock).mockReturnValue(userInput)

      const result = await service.initializePage(Page, request, dataServices, userInput)

      expect(result).toBeInstanceOf(Page)

      expect(Page).toHaveBeenCalledWith(userInput, application, '')
    })

    it('should load from the application if the body and userInput are blank', async () => {
      const data = { 'my-task': { first: { foo: 'bar' } } }
      const applicationWithData = {
        ...application,
        data,
      }
      request.body = {}
      applicationClient.find.mockResolvedValue(applicationWithData)
      ;(getBody as jest.Mock).mockReturnValue(data['my-task'].first)

      const result = await service.initializePage(Page, request, dataServices)

      expect(result).toBeInstanceOf(Page)

      expect(Page).toHaveBeenCalledWith({ foo: 'bar' }, applicationWithData, '')
    })

    it("should call a service's initialize method if it exists", async () => {
      const OtherPage = { initialize: jest.fn() } as unknown as TaskListPageInterface
      ;(getBody as jest.Mock).mockReturnValue(request.body)

      await service.initializePage(OtherPage, request, dataServices)

      expect(OtherPage.initialize).toHaveBeenCalledWith(request.body, application, request.user.token, dataServices)
    })

    it("retrieve the 'previousPage' value from the session and call the Page object's constructor with that value", async () => {
      ;(getBody as jest.Mock).mockReturnValue(request.body)

      request.session.previousPage = 'previous-page-name'
      await service.initializePage(Page, request, dataServices)

      expect(Page).toHaveBeenCalledWith(request.body, application, 'previous-page-name')
    })
  })

  describe('submit', () => {
    it('calls the submit method', async () => {
      const application = applicationFactory.build()
      const applicationData = createMock<SubmitCas2Application>()
      const token = 'SOME_TOKEN'

      applicationClient.submit.mockImplementation(() => Promise.resolve())
      ;(getApplicationSubmissionData as jest.Mock).mockReturnValue(applicationData)

      await service.submit(token, application)

      expect(applicationClientFactory).toHaveBeenCalledWith(token)
      expect(applicationClient.submit).toHaveBeenCalledWith(application.id, applicationData)
    })
  })

  describe('saveData', () => {
    it('updates the application data', async () => {
      const application = applicationFactory.build({ data: null })
      applicationClient.find.mockResolvedValue(application)

      const token = 'some-token'
      const request = createMock<Request>({
        params: { id: application.id, task: 'some-task', page: 'some-page' },
        user: { token },
      })

      const applicationData = createMock<UpdateCas2Application>()

      const newApplicationData = { 'risk-to-self': { vulnerability: { vulnerabilityDetail: 'example' } } }

      await service.saveData(newApplicationData, request)

      expect(applicationClientFactory).toHaveBeenCalledWith(token)
      expect(getApplicationUpdateData).toHaveBeenCalledWith({
        ...application,
        data: newApplicationData,
      })
      expect(applicationClient.update).toHaveBeenCalledWith(application.id, applicationData)
    })
  })
})
