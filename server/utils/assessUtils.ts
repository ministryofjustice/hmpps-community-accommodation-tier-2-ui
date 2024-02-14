import { Cas2ApplicationStatus, Cas2ApplicationStatusDetail, Cas2StatusUpdate } from '@approved-premises/api'

export const applicationStatusRadios = (
  statuses: Array<Record<string, string>>,
  previousStatuses: Array<Cas2StatusUpdate>,
) => {
  return statuses.map(status => {
    return {
      value: status.name,
      text: status.label,
      checked: previousStatuses.length ? status.name === previousStatuses[0].name : false,
    }
  })
}

export const applicationStatusDetailOptions = (
  statusDetails: Array<Cas2ApplicationStatusDetail>,
  previousStatuses: Array<Cas2StatusUpdate>,
) => {
  const previousStatusUpdateDetails = previousStatuses.length ? previousStatuses[0].statusUpdateDetails : []

  return statusDetails.map(statusDetail => {
    return {
      value: statusDetail.name,
      text: statusDetail.label,
      checked: previousStatusUpdateDetails.some(detail => detail.name === statusDetail.name),
    }
  })
}

export const getStatusDetailsByStatusName = (
  statuses: Array<Cas2ApplicationStatus>,
  statusName: string,
): Array<Cas2ApplicationStatusDetail | null> => {
  if (!statuses.length) {
    return []
  }

  const statusDetails = statuses.filter(status => status.name === statusName)[0]?.statusDetails

  return statusDetails
}

export const getStatusDetailQuestionText = (status: string): string => {
  const questions = {
    moreInfoRequested: 'What information do you need?',
    offerDeclined: 'Why was the offer declined or withdrawn?',
    withdrawn: 'Why was the referral withdrawn?',
    cancelled: 'Why was the referral cancelled?',
  }

  return questions[status] || ''
}
