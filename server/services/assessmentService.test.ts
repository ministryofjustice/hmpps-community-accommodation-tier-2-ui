import { UpdateCas2Assessment } from '@approved-premises/api'
import AssessmentService from './assessmentService'
import AssessmentClient from '../data/assessmentClient'

import { assessmentFactory } from '../testutils/factories'

jest.mock('../data/assessmentClient.ts')

describe('AssessmentService', () => {
  const assessmentClient = new AssessmentClient(null) as jest.Mocked<AssessmentClient>
  const assessmentClientFactory = jest.fn()

  const service = new AssessmentService(assessmentClientFactory)

  beforeEach(() => {
    jest.resetAllMocks()
    assessmentClientFactory.mockReturnValue(assessmentClient)
  })

  describe('findAssessment', () => {
    it('calls the find method and returns an assessment', async () => {
      const assessment = assessmentFactory.build()

      const token = 'SOME_TOKEN'

      assessmentClient.find.mockResolvedValue(assessment)

      const result = await service.findAssessment(token, assessment.id)

      expect(result).toEqual(assessment)

      expect(assessmentClientFactory).toHaveBeenCalledWith(token)
      expect(assessmentClient.find).toHaveBeenCalledWith(assessment.id)
    })
  })

  describe('updateAssessment', () => {
    it('calls the update method and returns an assessment', async () => {
      const assessment = assessmentFactory.build()

      const token = 'SOME_TOKEN'

      assessmentClient.update.mockResolvedValue(assessment)

      const updateData: UpdateCas2Assessment = {
        nacroReferralId: 'nacro-referral-id',
        assessorName: 'assessor-name',
      }

      const result = await service.updateAssessment(token, assessment.id, updateData)

      expect(result).toEqual(assessment)

      expect(assessmentClientFactory).toHaveBeenCalledWith(token)
      expect(assessmentClient.update).toHaveBeenCalledWith(assessment.id, updateData)
    })
  })
})
