import { Unit } from '@approved-premises/api'
import { lastKnownKeys, previousKeys } from '../../form-pages/apply/about-the-person/address-history/previousAddress'
import { PreviousConvictionsAnswers } from '../../form-pages/apply/offence-and-licence-information/offending-history/anyPreviousConvictions'

export default function deleteOrphanedFollowOnAnswers(applicationData: Unit): Unit {
  const deleteOrphanedFundingInformation = () => {
    delete applicationData['funding-information'].identification
    delete applicationData['funding-information']['alternative-identification']
  }

  const deleteOrphanedEqualityInformation = () => {
    Object.keys(applicationData['equality-and-diversity-monitoring']).forEach(key => {
      if (key !== 'will-answer-equality-questions') {
        delete applicationData['equality-and-diversity-monitoring'][key]
      }
    })
  }

  const deleteOrphanedOffendingHistoryInformation = () => {
    delete applicationData['offending-history']['offence-history-data']
  }

  const deleteAddressHistoryInformation = () => {
    if (applicationData['address-history']['previous-address'].hasPreviousAddress === 'yes') {
      lastKnownKeys.forEach(key => delete applicationData['address-history']['previous-address'][key])
    } else if (applicationData['address-history']['previous-address'].hasPreviousAddress === 'no') {
      previousKeys.forEach(key => delete applicationData['address-history']['previous-address'][key])
    }
  }

  const deleteOrphanedRoSHSummaryAnswers = () => {
    if (applicationData['risk-of-serious-harm']['old-oasys']?.hasOldOasys === 'no') {
      delete applicationData['risk-of-serious-harm']['old-oasys'].oasysCompletedDate
      delete applicationData['risk-of-serious-harm']['old-oasys']['oasysCompletedDate-year']
      delete applicationData['risk-of-serious-harm']['old-oasys']['oasysCompletedDate-month']
      delete applicationData['risk-of-serious-harm']['old-oasys']['oasysCompletedDate-day']
    } else if (applicationData['risk-of-serious-harm']['old-oasys']?.hasOldOasys === 'yes') {
      delete applicationData['risk-of-serious-harm']['manual-rosh-information']
    }
  }

  const hasOrphanedInformation = ({
    taskName,
    pageName,
    questionKey,
    answerToCheck,
  }: {
    taskName: string
    pageName: string
    questionKey: string
    answerToCheck: string
  }) => {
    return applicationData[taskName]?.[pageName]?.[questionKey] === answerToCheck
  }

  if (
    hasOrphanedInformation({
      taskName: 'funding-information',
      pageName: 'funding-source',
      questionKey: 'fundingSource',
      answerToCheck: 'personalSavings',
    })
  ) {
    deleteOrphanedFundingInformation()
  }

  if (
    hasOrphanedInformation({
      taskName: 'equality-and-diversity-monitoring',
      pageName: 'will-answer-equality-questions',
      questionKey: 'willAnswer',
      answerToCheck: 'no',
    })
  ) {
    deleteOrphanedEqualityInformation()
  }

  if (
    hasOrphanedInformation({
      taskName: 'offending-history',
      pageName: 'any-previous-convictions',
      questionKey: 'hasAnyPreviousConvictions',
      answerToCheck: PreviousConvictionsAnswers.No,
    })
  ) {
    deleteOrphanedOffendingHistoryInformation()
  }

  if (
    hasOrphanedInformation({
      taskName: 'offending-history',
      pageName: 'any-previous-convictions',
      questionKey: 'hasAnyPreviousConvictions',
      answerToCheck: PreviousConvictionsAnswers.YesNoRelevantRisk,
    })
  ) {
    deleteOrphanedOffendingHistoryInformation()
  }

  if (applicationData['address-history']?.['previous-address']?.hasPreviousAddress) {
    deleteAddressHistoryInformation()
  }

  if (applicationData['risk-of-serious-harm']) {
    deleteOrphanedRoSHSummaryAnswers()
  }
  return applicationData
}
