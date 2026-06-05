import { Cas2HdcApplicationStatus, Cas2HdcApplicationStatusDetail, Cas2HdcStatusUpdate } from '@approved-premises/api'

export const applicationStatusRadios = (
  statuses: Array<Record<string, string>>,
  previousStatuses: Array<Cas2HdcStatusUpdate>,
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
  statusDetails: Array<Cas2HdcApplicationStatusDetail>,
  previousStatuses: Array<Cas2HdcStatusUpdate>,
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
  statuses: Array<Cas2HdcApplicationStatus>,
  statusName: string,
): Array<Cas2HdcApplicationStatusDetail | null> => {
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
