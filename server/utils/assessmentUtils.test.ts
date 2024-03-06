import { assessmentFactory } from '../testutils/factories'
import { assessmentHasExistingData } from './assessmentUtils'

describe('assessmentHasExistingData', () => {
  describe('when the assessment has existing data', () => {
    it('returns true', () => {
      const assessment = assessmentFactory.build({
        nacroReferralId: 'nacro-referral-id',
        assessorName: null,
      })

      expect(assessmentHasExistingData(assessment)).toBe(true)
    })
  })

  describe('when the assessment does not have existing data', () => {
    it('returns false', () => {
      const assessment = assessmentFactory.build({
        nacroReferralId: null,
        assessorName: null,
      })

      expect(assessmentHasExistingData(assessment)).toBe(false)
    })
  })
})
