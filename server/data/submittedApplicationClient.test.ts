import SubmittedApplicationClient from './submittedApplicationClient'
import { applicationFactory, applicationNoteFactory, submittedApplicationFactory } from '../testutils/factories'
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

  describe('addNote', () => {
    it('should create a note', async () => {
      const application = applicationFactory.build()
      const body = {
        note: 'some note',
      }

      const applicationNote = applicationNoteFactory.build({ body: body.note })

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to add a note to an application',
        withRequest: {
          method: 'POST',
          path: paths.assessments.applicationNotes.create({ id: application.id }),
          body,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: applicationNote,
        },
      })

      const result = await submittedApplicationClient.addNote(application.id, body.note)

      expect(result).toEqual(applicationNote)
    })
  })
})
