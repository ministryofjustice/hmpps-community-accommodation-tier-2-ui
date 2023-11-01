import SubmittedApplicationClient from '../data/submittedApplicationClient'
import SubmittedApplicationService from './submittedApplicationService'

import { submittedApplicationFactory } from '../testutils/factories'

jest.mock('../data/submittedApplicationClient.ts')

describe('SubmittedApplicationService', () => {
  const submittedApplicationClient = new SubmittedApplicationClient(null) as jest.Mocked<SubmittedApplicationClient>
  const submittedApplicationClientFactory = jest.fn()

  const service = new SubmittedApplicationService(submittedApplicationClientFactory)

  beforeEach(() => {
    jest.resetAllMocks()
    submittedApplicationClientFactory.mockReturnValue(submittedApplicationClient)
  })

  describe('findApplication', () => {
    it('calls APIs find method and returns the found application', async () => {
      const submittedApplication = submittedApplicationFactory.build()
      const token = 'SOME_TOKEN'

      submittedApplicationClient.find.mockResolvedValue(submittedApplication)

      const result = await service.findApplication(token, submittedApplication.id)

      expect(result).toEqual(submittedApplication)

      expect(submittedApplicationClientFactory).toHaveBeenCalledWith(token)
      expect(submittedApplicationClient.find).toHaveBeenCalledWith(submittedApplication.id)
    })
  })
})
