import AssessmentClient from './assessmentClient'
import { assessmentFactory } from '../testutils/factories'
import paths from '../paths/api'
import describeClient from '../testutils/describeClient'

describeClient('AssessmentClient', provider => {
  let assessmentClient: AssessmentClient

  const token = 'token-1'

  beforeEach(() => {
    assessmentClient = new AssessmentClient(token)
  })

  describe('find', () => {
    it('should return an assessment', async () => {
      const assessment = assessmentFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request for an assessment',
        withRequest: {
          method: 'GET',
          path: paths.assessments.show({ id: assessment.id }),
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: assessment,
        },
      })

      const result = await assessmentClient.find(assessment.id)

      expect(result).toEqual(assessment)
    })
  })

  describe('update', () => {
    it('should return an assessment when a PUT request is made', async () => {
      const assessment = assessmentFactory.build()
      const data = { nacroReferralId: 'nacro-referral-id', assessorName: 'Assessor Name' }

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'Request to update an assessment',
        withRequest: {
          method: 'PUT',
          path: paths.assessments.update({ id: assessment.id }),
          body: JSON.stringify(data),
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: assessment,
        },
      })

      const result = await assessmentClient.update(assessment.id, data)

      expect(result).toEqual(assessment)
    })
  })

  describe('updateStatus', () => {
    it('should create a status update', async () => {
      const assessment = assessmentFactory.build()
      const data = {
        newStatus: 'received',
      }

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to update the status of an application',
        withRequest: {
          method: 'POST',
          path: paths.assessmentStatusUpdates.create({ id: assessment.id }),
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
        },
      })

      await assessmentClient.updateStatus(assessment.id, data)
    })
  })
})
