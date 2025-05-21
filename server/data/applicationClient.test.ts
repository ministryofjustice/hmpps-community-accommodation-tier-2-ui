import { AssignmentType, SubmitCas2Application, UpdateApplication } from '@approved-premises/api'
import { faker } from '@faker-js/faker/locale/en_GB'
import ApplicationClient from './applicationClient'
import { applicationFactory, assessmentFactory } from '../testutils/factories'
import paths from '../paths/api'
import describeClient from '../testutils/describeClient'

describeClient('ApplicationClient', provider => {
  let applicationClient: ApplicationClient

  const token = 'token-1'

  beforeEach(() => {
    applicationClient = new ApplicationClient(token)
  })

  describe('find', () => {
    it('should return an application', async () => {
      const application = applicationFactory.build({
        assessment: assessmentFactory.build(),
        telephoneNumber: faker.phone.number(),
      })

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request for an application',
        withRequest: {
          method: 'GET',
          path: paths.applications.show({ id: application.id }),
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: application,
        },
      })

      const result = await applicationClient.find(application.id)

      expect(result).toEqual(application)
    })
  })

  describe('create', () => {
    it('should return an application when a crn is posted', async () => {
      const application = applicationFactory.build({
        assessment: assessmentFactory.build(),
        telephoneNumber: faker.phone.number(),
      })

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to create an Application with risks',
        withRequest: {
          method: 'POST',
          path: paths.applications.new.pattern,
          body: {
            crn: application.person.crn,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 201,
          body: application,
        },
      })

      const result = await applicationClient.create(application.person.crn)

      expect(result).toEqual(application)
    })
  })

  describe('getApplications', () => {
    describe('when returning a list of transferred out applications for the user', () => {
      const assignmentTypes: Array<AssignmentType> = ['IN_PROGRESS', 'PRISON', 'DEALLOCATED']

      it.each(assignmentTypes)('should return applications for given user', async assignmentType => {
        const applicationsForUser = applicationFactory.buildList(5)

        provider.addInteraction({
          state: 'Server is healthy',
          uponReceiving: 'A request for all applications that have been transferred out for a user',
          withRequest: {
            method: 'GET',
            path: paths.applications.index.pattern,
            query: { assignmentType },
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
          willRespondWith: {
            status: 200,
            body: applicationsForUser,
          },
        })

        const result = await applicationClient.getApplications(assignmentType)
        expect(result).toEqual(applicationsForUser)
      })
    })
  })

  describe('getPagedApplications', () => {
    describe('when returning a list of allocated applications for a given prison', () => {
      it('should get all allocated applications for a given prison', async () => {
        const assignmentType = 'PRISON'
        const applications = applicationFactory.buildList(5)

        provider.addInteraction({
          state: 'Server is healthy',
          uponReceiving: 'A request for all applications for a given prison',
          withRequest: {
            method: 'GET',
            path: paths.applications.index.pattern,
            query: {
              assignmentType,
              page: '1',
            },
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
          willRespondWith: {
            status: 200,
            body: applications,
            headers: {
              'X-Pagination-TotalPages': '10',
              'X-Pagination-TotalResults': '100',
              'X-Pagination-PageSize': '10',
            },
          },
        })

        const result = await applicationClient.getPagedApplications(1, assignmentType)

        expect(result).toEqual({
          data: applications,
          pageNumber: '1',
          totalPages: '10',
          totalResults: '100',
          pageSize: '10',
        })
      })
    })

    describe('when returning a list of unallocated applications for a given prison (i.e recent transferred in', () => {
      it('should get all applications transferred to a prison but not allocated', async () => {
        const applications = applicationFactory.buildList(5)

        provider.addInteraction({
          state: 'Server is healthy',
          uponReceiving: 'A request for all applications for a given prison',
          withRequest: {
            method: 'GET',
            path: paths.applications.index.pattern,
            query: {
              assignmentType: 'UNALLOCATED',
              page: '1',
            },
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
          willRespondWith: {
            status: 200,
            body: applications,
            headers: {
              'X-Pagination-TotalPages': '10',
              'X-Pagination-TotalResults': '100',
              'X-Pagination-PageSize': '10',
            },
          },
        })

        const result = await applicationClient.getPagedApplications(1, 'UNALLOCATED')

        expect(result).toEqual({
          data: applications,
          pageNumber: '1',
          totalPages: '10',
          totalResults: '100',
          pageSize: '10',
        })
      })
    })
  })

  describe('update', () => {
    it('should return an application when a PUT request is made', async () => {
      const application = applicationFactory.build({
        assessment: assessmentFactory.build(),
        telephoneNumber: faker.phone.number(),
      })
      const data = {
        data: application.data,
        type: 'CAS2',
      } as UpdateApplication

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'Request to update an application',
        withRequest: {
          method: 'PUT',
          path: paths.applications.update({ id: application.id }),
          body: JSON.stringify(data),
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: application,
        },
      })

      const result = await applicationClient.update(application.id, data)

      expect(result).toEqual(application)
    })
  })

  describe('submit', () => {
    it('should submit an application', async () => {
      const application = applicationFactory.build()
      const data = {
        translatedDocument: application.document,
        applicationId: application.id,
        telephoneNumber: '123',
      } as SubmitCas2Application

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to submit an application',
        withRequest: {
          method: 'POST',
          path: paths.submissions.create.pattern,
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
        },
      })

      await applicationClient.submit(application.id, data)
    })
  })

  describe('abandon', () => {
    it('should return response when a PUT request is made', async () => {
      const application = applicationFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'Request to abandon an application',
        withRequest: {
          method: 'PUT',
          path: paths.applications.abandon({ id: application.id }),
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
        },
      })

      await applicationClient.abandon(application.id)
    })
  })
})
