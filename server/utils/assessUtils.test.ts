import { statusUpdateFactory } from '../testutils/factories'
import { applicationStatusRadios } from './assessUtils'

describe('applicationStatusRadios', () => {
  const statuses = [
    {
      id: 'f5cd423b-08eb-4efb-96ff-5cc6bb073905',
      name: 'moreInfoRequested',
      label: 'More information requested',
      description: 'More information about the application has been requested from the POM (Prison Offender Manager.',
    },
    {
      id: 'ba4d8432-250b-4ab9-81ec-7eb4b16e5dd1',
      name: 'awaitingDecision',
      label: 'Awaiting decision',
      description: 'All information has been received and the application is awaiting assessment.',
    },
  ]

  it('returns an array of radios', () => {
    const expected = [
      {
        value: 'moreInfoRequested',
        text: 'More information requested',
        hint: {
          text: 'More information about the application has been requested from the POM (Prison Offender Manager.',
        },
        checked: false,
      },
      {
        value: 'awaitingDecision',
        text: 'Awaiting decision',
        hint: {
          text: 'All information has been received and the application is awaiting assessment.',
        },
        checked: true,
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
        hint: {
          text: 'More information about the application has been requested from the POM (Prison Offender Manager.',
        },
        checked: false,
      },
      {
        value: 'awaitingDecision',
        text: 'Awaiting decision',
        hint: {
          text: 'All information has been received and the application is awaiting assessment.',
        },
        checked: false,
      },
    ]

    expect(applicationStatusRadios(statuses, [])).toEqual(expected)
  })
})
