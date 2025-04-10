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

  describe('all', () => {
    it('should get all previous applications', async () => {
      const previousApplications = applicationFactory.buildList(5)

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request for all applications',
        withRequest: {
          method: 'GET',
          path: paths.applications.index.pattern,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: previousApplications,
        },
      })

      const result = await applicationClient.all()

      expect(result).toEqual(previousApplications)
    })
  })

  describe('getApplicationsForUser', () => {
    describe('when returning a list of transferred out applications for the user', () => {
      it('should get all transferred out applications for given user', async () => {
        const transferredOutApplications = applicationFactory.buildList(5)

        provider.addInteraction({
          state: 'Server is healthy',
          uponReceiving: 'A request for all applications that have been transferred out for a user',
          withRequest: {
            method: 'GET',
            path: paths.applications.index.pattern,
            query: { assignmentType: 'DEALLOCATED' },
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
          willRespondWith: {
            status: 200,
            body: transferredOutApplications,
          },
        })

        const result = await applicationClient.getApplicationsForUser('DEALLOCATED' as AssignmentType)
        expect(result).toEqual(transferredOutApplications)
      })
    })
  })

  describe('getAllAllocatedForPrison', () => {
    it('should get all allocated applications for a given prison', async () => {
      const applications = applicationFactory.buildList(5)

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request for all applications for a given prison',
        withRequest: {
          method: 'GET',
          path: paths.applications.index.pattern,
          query: {
            prisonCode: '123',
            assignmentType: 'ALLOCATED',
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

      const result = await applicationClient.getAllAllocatedForPrison('123', 1)

      expect(result).toEqual({
        data: applications,
        pageNumber: '1',
        totalPages: '10',
        totalResults: '100',
        pageSize: '10',
      })
    })
  })

  describe('getPrisonNewTransferredIn', () => {
    it('should get all applications transferred to a prison but not allocated', async () => {
      const applications = applicationFactory.buildList(5)

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request for all applications for a given prison',
        withRequest: {
          method: 'GET',
          path: paths.applications.index.pattern,
          query: {
            prisonCode: '123',
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

      const result = await applicationClient.getPrisonNewTransferredIn('123', 1)

      expect(result).toEqual({
        data: applications,
        pageNumber: '1',
        totalPages: '10',
        totalResults: '100',
        pageSize: '10',
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
