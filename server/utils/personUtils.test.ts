import { statusTag } from './personUtils'

describe('personUtils', () => {
  describe('statusTag', () => {
    it('returns an "In Community" tag for an InCommunity status', () => {
      expect(statusTag('InCommunity')).toEqual(
        `<strong class="govuk-tag" data-cy-status="InCommunity">In Community</strong>`,
      )
    })

    it('returns an "In Custody" tag for an InCustody status', () => {
      expect(statusTag('InCustody')).toEqual(`<strong class="govuk-tag" data-cy-status="InCustody">In Custody</strong>`)
    })
  })
})
