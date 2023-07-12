import ApplicationService from './applicationService'
import ApplicationClient from '../data/applicationClient'

import { applicationFactory } from '../testutils/factories'

jest.mock('../data/applicationClient.ts')
jest.mock('../data/personClient.ts')

describe('ApplicationService', () => {
  const token = 'SOME_TOKEN'
  const applicationClient = new ApplicationClient(token) as jest.Mocked<ApplicationClient>
  const applicationClientFactory = jest.fn()

  const service = new ApplicationService(applicationClientFactory)

  beforeEach(() => {
    jest.resetAllMocks()
    applicationClientFactory.mockReturnValue(applicationClient)
  })

  describe('createApplication', () => {
    it('calls the create method and returns an application', async () => {
      const application = applicationFactory.build()

      applicationClient.create.mockResolvedValue(application)

      const result = await service.createApplication(token, application.person.crn)

      expect(result).toEqual(application)

      expect(applicationClientFactory).toHaveBeenCalledWith(token)
      expect(applicationClient.create).toHaveBeenCalledWith(application.person.crn)
    })
  })

  describe('getAllApplications', () => {
    const applications = applicationFactory.buildList(5)

    it('fetches all applications', async () => {
      applicationClient.all.mockResolvedValue(applications)

      const result = await service.getAllApplications(token)

      expect(result).toEqual(applications)

      expect(applicationClientFactory).toHaveBeenCalledWith(token)
      expect(applicationClient.all).toHaveBeenCalled()
    })
  })
})
