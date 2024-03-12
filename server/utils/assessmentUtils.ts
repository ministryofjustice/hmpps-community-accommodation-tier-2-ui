import { Cas2Assessment } from '@approved-premises/api'

export const assessmentHasExistingData = (assessment: Cas2Assessment): boolean => {
  return Boolean(assessment.assessorName) || Boolean(assessment.nacroReferralId)
}
