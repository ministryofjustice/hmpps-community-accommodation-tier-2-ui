import { Cas2ApplicationStatusDetail } from '@approved-premises/api'
import {
  statusUpdateFactory,
  statusUpdateDetailFactory,
  applicationStatusDetailFactory,
  applicationStatusFactory,
} from '../testutils/factories'
import {
  applicationStatusRadios,
  applicationStatusDetailOptions,
  getStatusDetailsByStatusName,
  getStatusDetailQuestionText,
} from './assessUtils'

describe('applicationStatusRadios', () => {
  const statuses = [
    {
      id: 'f5cd423b-08eb-4efb-96ff-5cc6bb073905',
      name: 'moreInfoRequested',
      label: 'More information requested',
      description: 'More information about the application has been requested from the POM (Prison Offender Manager).',
    },
    {
      id: 'ba4d8432-250b-4ab9-81ec-7eb4b16e5dd1',
      name: 'awaitingDecision',
      label: 'Awaiting decision',
      description: 'All information has been received and the application is awaiting assessment.',
    },
    {
      id: 'cd4d8432-250b-4ab9-81ec-7eb4b16e5cc2',
      name: 'example',
      label: 'Example',
    },
  ]

  it('returns an array of radios', () => {
    const expected = [
      {
        value: 'moreInfoRequested',
        text: 'More information requested',
        checked: false,
      },
      {
        value: 'awaitingDecision',
        text: 'Awaiting decision',
        checked: true,
      },
      {
        value: 'example',
        text: 'Example',
        checked: false,
      },
    ]

    const previousStatuses = [statusUpdateFactory.build({ name: 'awaitingDecision' })]

    expect(applicationStatusRadios(statuses, previousStatuses)).toEqual(expected)
  })

  it('does not check a radio if previousStatuses is empty array', () => {
    const expected = [
      {
        value: 'moreInfoRequested',
        text: 'More information requested',
        checked: false,
      },
      {
        value: 'awaitingDecision',
        text: 'Awaiting decision',
        checked: false,
      },
      {
        value: 'example',
        text: 'Example',
        checked: false,
      },
    ]

    expect(applicationStatusRadios(statuses, [])).toEqual(expected)
  })
})

describe('applicationStatusUpdateDetailCheckboxes', () => {
  const statusDetails = [
    {
      id: '9019c886-dcba-4277-b667-423a2ab847c3',
      name: 'aboutTheApplicant',
      label: 'About the applicant',
    },
    {
      id: 'b174b4ab-25c2-4808-993b-dd00d646cb34',
      name: 'areaFundingAndId',
      label: 'Area, Funding and ID',
    },
    {
      id: 'b7636e4e-bf05-4c35-a79f-41c1089cb578',
      name: 'risksAndNeeds',
      label: 'Risks and needs',
    },
  ] as Array<Cas2ApplicationStatusDetail>

  it('returns an array of checkboxes', () => {
    const expected = [
      {
        value: 'aboutTheApplicant',
        text: 'About the applicant',
        checked: true,
      },
      {
        value: 'areaFundingAndId',
        text: 'Area, Funding and ID',
        checked: true,
      },
      {
        value: 'risksAndNeeds',
        text: 'Risks and needs',
        checked: false,
      },
    ]

    const previousStatuses = [
      statusUpdateFactory.build({
        name: 'moreInfoRequested',
        statusUpdateDetails: [
          statusUpdateDetailFactory.build({ name: 'aboutTheApplicant' }),
          statusUpdateDetailFactory.build({ name: 'areaFundingAndId' }),
        ],
      }),
    ]

    expect(applicationStatusDetailOptions(statusDetails, previousStatuses)).toEqual(expected)
  })

  it('does not check boxes if previous statuses is an empty array', () => {
    const expected = [
      {
        value: 'aboutTheApplicant',
        text: 'About the applicant',
        checked: false,
      },
      {
        value: 'areaFundingAndId',
        text: 'Area, Funding and ID',
        checked: false,
      },
      {
        value: 'risksAndNeeds',
        text: 'Risks and needs',
        checked: false,
      },
    ]

    expect(applicationStatusDetailOptions(statusDetails, [])).toEqual(expected)
  })
})

describe('getStatusDetailsByStatusName', () => {
  it('returns a list of status details belonging to the status name', () => {
    const applicationStatus1Detail = applicationStatusDetailFactory.build()
    const applicationStatus2Detail = applicationStatusDetailFactory.build()

    const applicationStatus1 = applicationStatusFactory.build({ statusDetails: [applicationStatus1Detail] })
    const applicationStatus2 = applicationStatusFactory.build({ statusDetails: [applicationStatus2Detail] })

    const statusName = applicationStatus1.name

    expect(getStatusDetailsByStatusName([applicationStatus1, applicationStatus2], statusName)).toEqual(
      applicationStatus1.statusDetails,
    )
  })

  it('returns an empty array if application status does not contain status detail', () => {
    const applicationStatus1 = applicationStatusFactory.build({ statusDetails: [] })
    const applicationStatus2 = applicationStatusFactory.build({ statusDetails: [] })

    const statusName = applicationStatus1.name

    expect(getStatusDetailsByStatusName([applicationStatus1, applicationStatus2], statusName)).toEqual([])
  })
})

describe('getStatusDetailQuestionText', () => {
  it('returns question associated with status name', () => {
    expect(getStatusDetailQuestionText('moreInfoRequested')).toEqual('What information do you need?')
    expect(getStatusDetailQuestionText('offerDeclined')).toEqual('Why was the offer declined or withdrawn?')
    expect(getStatusDetailQuestionText('withdrawn')).toEqual('Why was the referral withdrawn?')
    expect(getStatusDetailQuestionText('cancelled')).toEqual('Why was the referral cancelled?')
  })

  it('returns an empty string if the status has no associated question', () => {
    expect(getStatusDetailQuestionText('statusNotFound')).toEqual('')
  })
})
