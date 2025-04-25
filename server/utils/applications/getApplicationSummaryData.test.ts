import { FullPerson } from '@approved-premises/api'
import { applicationFactory } from '../../testutils/factories'
import {
  getApplicationSummaryData,
  getTransferredApplicationSummaryData,
  TransferredApplicationSummary,
} from './getApplicationSummaryData'

describe('getApplicationSummaryData', () => {
  it('returns the correct summary', () => {
    const application = applicationFactory.build({
      id: '123',
      person: {
        name: 'John Doe',
        nomsNumber: 'A1234BC',
        prisonName: 'HMP Example',
      } as FullPerson,
      createdBy: {
        name: 'Referrer Name',
        email: 'referrer@example.com',
      },
      telephoneNumber: '07456 111777',
      allocatedPomName: 'Pom User',
      allocatedPomEmailAddress: 'pom_user@example.com',
      currentPrisonName: 'Example Prison',
      assignmentDate: '2021-06-01',
    })

    const result = getApplicationSummaryData(application)

    expect(result).toEqual({
      id: '123',
      name: 'John Doe',
      prisonNumber: 'A1234BC',
      prisonName: 'HMP Example',
      referrerName: 'Referrer Name',
      contactEmail: 'referrer@example.com',
      contactNumber: '07456 111777',
      isTransferredApplication: false,
      view: 'referrerSubmission',
    })
  })
})

describe('getTransferredApplicationSummaryData', () => {
  it.each([
    [
      'Pom User',
      'pom_user@example.com',
      '2021-06-01',
      {
        id: '123',
        name: 'John Doe',
        prisonNumber: 'A1234BC',
        emailLabel: 'Email address:',
        pomAllocation: 'Pom User, Example Prison',
        pomAllocationLabel: 'Prison offender manager (POM) from 1 June 2021:',
        contactEmail: 'pom_user@example.com',
        view: 'referrerSubmission',
        isTransferredApplication: true,
      },
    ],
    [
      'Pom User',
      'pom_user@example.com',
      undefined,
      {
        id: '123',
        name: 'John Doe',
        prisonNumber: 'A1234BC',
        emailLabel: 'Email address:',
        pomAllocation: 'Pom User, Example Prison',
        pomAllocationLabel: 'Prison offender manager (POM):',
        contactEmail: 'pom_user@example.com',
        view: 'referrerSubmission',
        isTransferredApplication: true,
      },
    ],
    [
      'Pom User',
      undefined,
      '2021-06-01',
      {
        id: '123',
        name: 'John Doe',
        prisonNumber: 'A1234BC',
        emailLabel: 'Offender management unit email address:',
        pomAllocation: 'Pom User, Example Prison',
        pomAllocationLabel: 'Prison offender manager (POM) from 1 June 2021:',
        contactEmail: 'omu@example.com',
        view: 'referrerSubmission',
        isTransferredApplication: true,
      },
    ],
    [
      undefined,
      'pom_user@example.com',
      '2021-06-01',
      {
        id: '123',
        name: 'John Doe',
        prisonNumber: 'A1234BC',
        emailLabel: 'Offender management unit email address:',
        pomAllocation: 'To be allocated',
        pomAllocationLabel: 'Prison offender manager (POM):',
        contactEmail: 'omu@example.com',
        view: 'referrerSubmission',
        isTransferredApplication: true,
      },
    ],
    [
      undefined,
      undefined,
      undefined,
      {
        id: '123',
        name: 'John Doe',
        prisonNumber: 'A1234BC',
        emailLabel: 'Offender management unit email address:',
        pomAllocation: 'To be allocated',
        pomAllocationLabel: 'Prison offender manager (POM):',
        contactEmail: 'omu@example.com',
        view: 'referrerSubmission',
        isTransferredApplication: true,
      },
    ],
    [
      undefined,
      undefined,
      '2021-06-01',
      {
        id: '123',
        name: 'John Doe',
        prisonNumber: 'A1234BC',
        emailLabel: 'Offender management unit email address:',
        pomAllocation: 'To be allocated',
        pomAllocationLabel: 'Prison offender manager (POM):',
        contactEmail: 'omu@example.com',
        view: 'referrerSubmission',
        isTransferredApplication: true,
      },
    ],
    [
      undefined,
      'pom_user@example.com',
      undefined,
      {
        id: '123',
        name: 'John Doe',
        prisonNumber: 'A1234BC',
        emailLabel: 'Offender management unit email address:',
        pomAllocation: 'To be allocated',
        pomAllocationLabel: 'Prison offender manager (POM):',
        contactEmail: 'omu@example.com',
        view: 'referrerSubmission',
        isTransferredApplication: true,
      },
    ],
    [
      'Pom User',
      undefined,
      undefined,
      {
        id: '123',
        name: 'John Doe',
        prisonNumber: 'A1234BC',
        emailLabel: 'Offender management unit email address:',
        pomAllocation: 'Pom User, Example Prison',
        pomAllocationLabel: 'Prison offender manager (POM):',
        contactEmail: 'omu@example.com',
        view: 'referrerSubmission',
        isTransferredApplication: true,
      },
    ],
  ])(
    'returns the correct summary when pom-user is %s and pom-email is %s and assignment-date is %s',
    (
      allocatedPomName: string,
      allocatedPomEmailAddress: string,
      assignmentDate: string,
      expectedResult: TransferredApplicationSummary,
    ) => {
      const application = applicationFactory.build({
        id: '123',
        person: {
          name: 'John Doe',
          nomsNumber: 'A1234BC',
          prisonName: 'HMP Example',
        } as FullPerson,
        createdBy: {
          name: 'Referrer Name',
          email: 'referrer@example.com',
        },
        allocatedPomName,
        allocatedPomEmailAddress,
        currentPrisonName: 'Example Prison',
        assignmentDate,
        isTransferredApplication: true,
        omuEmailAddress: 'omu@example.com',
      })
      const result = getTransferredApplicationSummaryData(application)
      expect(result).toEqual(expectedResult)
    },
  )
})
