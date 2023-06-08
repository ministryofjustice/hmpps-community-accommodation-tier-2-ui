import { applicationFactory } from '../testutils/factories'
import { dashboardTableRows } from './applicationUtils'

describe('dashboardTableRows', () => {
  it('returns an array of applications as table rows', async () => {
    const applicationA = applicationFactory.build({
      person: { name: 'A' },
    })
    const applicationB = applicationFactory.build({
      person: { name: 'A' },
    })

    const result = dashboardTableRows([applicationA, applicationB])

    expect(result).toEqual([
      [
        {
          text: applicationA.person.name,
        },
        {
          text: applicationA.person.crn,
        },
      ],
      [
        {
          text: applicationB.person.name,
        },
        {
          text: applicationB.person.crn,
        },
      ],
    ])
  })
})
