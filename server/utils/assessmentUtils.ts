import { Cas2HdcAssessment } from '@approved-premises/api'

export const assessmentHasExistingData = (assessment: Cas2HdcAssessment): boolean => {
  return Boolean(assessment.assessorName) || Boolean(assessment.nacroReferralId)
}
