import SubmittedApplicationService from './submittedApplicationService'

import { submittedApplicationFactory, applicationStatusFactory } from '../testutils/factories'
import submittedApplicationSummary from '../testutils/factories/submittedApplicationSummary'
import { ReferenceDataClient, SubmittedApplicationClient } from '../data'

jest.mock('../data/submittedApplicationClient.ts')
jest.mock('../data/referenceDataClient')

describe('SubmittedApplicationService', () => {
  const token = 'SOME_TOKEN'

  const submittedApplicationClient = new SubmittedApplicationClient(null) as jest.Mocked<SubmittedApplicationClient>
  const submittedApplicationClientFactory = jest.fn()

  const referenceDataClient = new ReferenceDataClient(null) as jest.Mocked<ReferenceDataClient>
  const referenceDataClientFactory = jest.fn()

  const service = new SubmittedApplicationService(submittedApplicationClientFactory, referenceDataClientFactory)

  const submittedApplication = submittedApplicationFactory.build()

  beforeEach(() => {
    jest.resetAllMocks()
    submittedApplicationClientFactory.mockReturnValue(submittedApplicationClient)
    referenceDataClientFactory.mockReturnValue(referenceDataClient)
  })

  describe('getAll', () => {
    it('calls APIs index method and returns all submitted applications', async () => {
      const submittedApplicationSummaries = submittedApplicationSummary.buildList(2)
      submittedApplicationClient.all.mockResolvedValue(submittedApplicationSummaries)

      const result = await service.getAll(token)

      expect(result).toEqual(submittedApplicationSummaries)

      expect(submittedApplicationClientFactory).toHaveBeenCalledWith(token)
      expect(submittedApplicationClient.all).toHaveBeenCalled()
    })
  })

  describe('findApplication', () => {
    it('calls APIs find method and returns the found application', async () => {
      submittedApplicationClient.find.mockResolvedValue(submittedApplication)

      const result = await service.findApplication(token, submittedApplication.id)

      expect(result).toEqual(submittedApplication)

      expect(submittedApplicationClientFactory).toHaveBeenCalledWith(token)
      expect(submittedApplicationClient.find).toHaveBeenCalledWith(submittedApplication.id)
    })
  })

  describe('getApplicationStatuses', () => {
    it('calls the correct client method', async () => {
      const statuses = applicationStatusFactory.buildList(5)

      referenceDataClient.getApplicationStatuses.mockResolvedValue(statuses)

      const result = await service.getApplicationStatuses(token)

      expect(result).toEqual(statuses)

      expect(referenceDataClientFactory).toHaveBeenCalledWith(token)
      expect(referenceDataClient.getApplicationStatuses).toHaveBeenCalled()
    })
  })

  describe('updateApplicationStatus', () => {
    it('calls the correct client method', async () => {
      submittedApplicationClient.updateStatus.mockImplementation(() => Promise.resolve())

      const data = { newStatus: 'onWaitingList' }

      await service.updateApplicationStatus(token, submittedApplication.id, data)

      expect(submittedApplicationClientFactory).toHaveBeenCalledWith(token)
      expect(submittedApplicationClient.updateStatus).toHaveBeenCalledWith(submittedApplication.id, data)
    })
  })
})
