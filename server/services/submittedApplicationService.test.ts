import { Cas2SubmittedApplicationSummary } from '@approved-premises/api'
import { PaginatedResponse } from '@approved-premises/ui'

import SubmittedApplicationService from './submittedApplicationService'
import {
  submittedApplicationFactory,
  applicationStatusFactory,
  paginatedResponseFactory,
  applicationNoteFactory,
} from '../testutils/factories'
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
      const paginatedResponse = paginatedResponseFactory.build({
        data: submittedApplicationSummaries,
        totalPages: '50',
        totalResults: '500',
        pageNumber: '2',
      }) as PaginatedResponse<Cas2SubmittedApplicationSummary>
      submittedApplicationClient.all.mockResolvedValue(paginatedResponse)

      const result = await service.getAll(token, 2)

      expect(result.data).toEqual(submittedApplicationSummaries)
      expect(result.pageNumber).toEqual('2')
      expect(result.pageSize).toEqual('10')
      expect(result.totalPages).toEqual('50')
      expect(result.totalResults).toEqual('500')

      expect(submittedApplicationClientFactory).toHaveBeenCalledWith(token)
      expect(submittedApplicationClient.all).toHaveBeenCalledWith(2)
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

  describe('addApplicationNote', () => {
    it('calls the correct client method and returns the created application note', async () => {
      const body = {
        note: 'some note',
      }

      const applicationNote = applicationNoteFactory.build({ body: body.note })

      submittedApplicationClient.addNote.mockImplementation(() => Promise.resolve(applicationNote))

      const result = await service.addApplicationNote(token, submittedApplication.id, body.note)

      expect(submittedApplicationClientFactory).toHaveBeenCalledWith(token)
      expect(submittedApplicationClient.addNote).toHaveBeenCalledWith(submittedApplication.id, body.note)
      expect(result).toEqual(applicationNote)
    })
  })
})
