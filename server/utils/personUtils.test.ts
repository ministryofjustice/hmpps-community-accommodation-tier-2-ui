import { personFactory } from '../testutils/factories'
import { isPersonMale, statusTag } from './personUtils'

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

  describe('isPersonMale', () => {
    it('returns true if person type is full person and sex is male', () => {
      const malePerson = personFactory.build({ type: 'FullPerson', sex: 'Male' })

      expect(isPersonMale(malePerson)).toEqual(true)
    })

    it('returns false if person type is full person and sex is female', () => {
      const malePerson = personFactory.build({ type: 'FullPerson', sex: 'Female' })

      expect(isPersonMale(malePerson)).toEqual(false)
    })

    it('returns false if person type is not full person', () => {
      const malePerson = personFactory.build({ type: 'RestrictedPerson' })

      expect(isPersonMale(malePerson)).toEqual(false)
    })
  })
})
