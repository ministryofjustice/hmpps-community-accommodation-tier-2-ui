import SubmittedApplicationClient from './submittedApplicationClient'
import { submittedApplicationFactory } from '../testutils/factories'
import paths from '../paths/api'
import describeClient from '../testutils/describeClient'

describeClient('SubmittedApplicationClient', provider => {
  let submittedApplicationClient: SubmittedApplicationClient

  const token = 'token-1'

  beforeEach(() => {
    submittedApplicationClient = new SubmittedApplicationClient(token)
  })

  describe('all', () => {
    it('should return all submitted applications', async () => {
      const submittedApplications = submittedApplicationFactory.buildList(2)

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request for a submitted application',
        withRequest: {
          method: 'GET',
          path: paths.submissions.index.pattern,
          query: { page: '1' },
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: submittedApplications,
          headers: {
            'X-Pagination-TotalPages': '10',
            'X-Pagination-TotalResults': '100',
            'X-Pagination-PageSize': '10',
          },
        },
      })

      const result = await submittedApplicationClient.all(1)

      expect(result).toEqual({
        data: submittedApplications,
        pageNumber: '1',
        totalPages: '10',
        totalResults: '100',
        pageSize: '10',
      })
    })
  })

  describe('find', () => {
    it('should return a submitted application', async () => {
      const submittedApplication = submittedApplicationFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request for a submitted application',
        withRequest: {
          method: 'GET',
          path: paths.submissions.show({ id: submittedApplication.id }),
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: submittedApplication,
        },
      })

      const result = await submittedApplicationClient.find(submittedApplication.id)

      expect(result).toEqual(submittedApplication)
    })
  })

  describe('updateStatus', () => {
    it('should create a status update', async () => {
      const application = submittedApplicationFactory.build()
      const data = {
        newStatus: 'received',
      }

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to update the status of an application',
        withRequest: {
          method: 'POST',
          path: paths.applicationStatusUpdates.create({ id: application.id }),
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
        },
      })

      await submittedApplicationClient.updateStatus(application.id, data)
    })
  })
})
