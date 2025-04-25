import { Cas2Application, FullPerson } from '@approved-premises/api'

import { DateFormats } from '../dateUtils'

export type ApplicationSummary = {
  id: string
  name: string
  prisonNumber: string
  contactEmail: string
  view: string
  isTransferredApplication: boolean
}

export type StandardApplicationSummary = ApplicationSummary & {
  prisonName: string
  referrerName: string
  contactNumber: string
}

export type TransferredApplicationSummary = ApplicationSummary & {
  pomAllocationLabel: string
  pomAllocation: string
  emailLabel: string
}

export const getApplicationSummaryData = (application: Cas2Application): StandardApplicationSummary => {
  const { name, nomsNumber, prisonName } = application.person as FullPerson
  return {
    id: application.id,
    name,
    prisonNumber: nomsNumber,
    prisonName,
    referrerName: application.createdBy.name,
    contactEmail: application.createdBy.email,
    contactNumber: application.telephoneNumber,
    isTransferredApplication: false,
    view: 'referrerSubmission',
  }
}

export const getTransferredApplicationSummaryData = (application: Cas2Application): TransferredApplicationSummary => {
  const { name, nomsNumber } = application.person as FullPerson
  const { allocatedPomName, allocatedPomEmailAddress, assignmentDate, currentPrisonName, omuEmailAddress } = application
  const date = assignmentDate ? DateFormats.dateObjtoUIDate(new Date(assignmentDate), { format: 'medium' }) : ''
  const pomAllocation = allocatedPomName ? `${allocatedPomName}, ${currentPrisonName}` : 'To be allocated'

  const pomAllocationLabel =
    allocatedPomName && date ? `Prison offender manager (POM) from ${date}:` : 'Prison offender manager (POM):'

  const [emailLabel, emailAddressValue] = getEmailFieldLabelAndEmailAddressValue(
    allocatedPomName,
    allocatedPomEmailAddress,
    omuEmailAddress,
  )

  return {
    id: application.id,
    name,
    prisonNumber: nomsNumber,
    contactEmail: emailAddressValue,
    emailLabel,
    pomAllocation,
    pomAllocationLabel,
    isTransferredApplication: true,
    view: 'referrerSubmission',
  }
}

const getEmailFieldLabelAndEmailAddressValue = (
  allocatedPomName: string,
  allocatedPomEmailAddress: string,
  omuEmailAddress: string,
) => {
  let emailLabel
  let emailAddressValue
  if (allocatedPomName && allocatedPomEmailAddress) {
    emailLabel = 'Email address:'
    emailAddressValue = allocatedPomEmailAddress
  } else {
    emailLabel = 'Offender management unit email address:'
    emailAddressValue = omuEmailAddress
  }
  return [emailLabel, emailAddressValue]
}
