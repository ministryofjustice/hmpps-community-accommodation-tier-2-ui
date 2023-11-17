import { applicationStatusRadios } from './assessUtils'

describe('applicationStatusRadios', () => {
  it('returns an array of radios', () => {
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

    const expected = [
      {
        value: 'moreInfoRequested',
        text: 'More information requested',
        hint: {
          text: 'More information about the application has been requested from the POM (Prison Offender Manager.',
        },
      },
      {
        value: 'awaitingDecision',
        text: 'Awaiting decision',
        hint: {
          text: 'All information has been received and the application is awaiting assessment.',
        },
      },
    ]

    expect(applicationStatusRadios(statuses)).toEqual(expected)
  })
})
