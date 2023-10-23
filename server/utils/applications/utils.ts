import type { FormPages, JourneyType } from '@approved-premises/ui'
import type { Cas2Application as Application } from '@approved-premises/api'
import Apply from '../../form-pages/apply'
import paths from '../../paths/apply'

export const journeyPages = (_journeyType: JourneyType): FormPages => {
  return Apply.pages
}

export const firstPageOfBeforeYouStartSection = (application: Application) => {
  return paths.applications.pages.show({ id: application.id, task: 'confirm-eligibility', page: 'confirm-eligibility' })
}

export const eligibilityQuestionIsAnswered = (application: Application): boolean => {
  return eligibilityAnswer(application) === 'yes' || eligibilityAnswer(application) === 'no'
}

export const eligibilityIsConfirmed = (application: Application): boolean => {
  return eligibilityAnswer(application) === 'yes'
}
export const eligibilityIsDenied = (application: Application): boolean => {
  return eligibilityAnswer(application) === 'no'
}

const eligibilityAnswer = (application: Application): string => {
  return application.data?.['confirm-eligibility']?.['confirm-eligibility']?.isEligible
}
