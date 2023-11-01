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
})
