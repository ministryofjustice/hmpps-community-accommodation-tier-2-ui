import { applicationFactory } from '../testutils/factories'
import { dashboardTableRows } from './applicationUtils'

describe('dashboardTableRows', () => {
  it('returns an array of applications as table rows', async () => {
    const applicationA = applicationFactory.build({
      person: { name: 'A' },
    })
    const applicationB = applicationFactory.build({
      person: { name: 'B' },
    })

    const result = dashboardTableRows([applicationA, applicationB])

    expect(result).toEqual([
      [
        {
          html: `<a href=/applications/${applicationA.id} data-cy-id="${applicationA.id}">A</a>`,
        },
        {
          text: applicationA.person.crn,
        },
      ],
      [
        {
          html: `<a href=/applications/${applicationB.id} data-cy-id="${applicationB.id}">B</a>`,
        },
        {
          text: applicationB.person.crn,
        },
      ],
    ])
  })
})
