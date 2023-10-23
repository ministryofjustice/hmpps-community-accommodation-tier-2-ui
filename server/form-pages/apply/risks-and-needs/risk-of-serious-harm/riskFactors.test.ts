import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import RiskFactors from './riskFactors'
import errorLookups from '../../../../i18n/en/errors.json'

describe('RiskFactors', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new RiskFactors({}, application)

      expect(page.title).toEqual(`Risk factors for Roger Smith`)
    })
  })

  describe('import date', () => {
    it('sets importDate to null where application contains no OASys import date', () => {
      const page = new RiskFactors({}, application)

      expect(page.importDate).toEqual(null)
    })
  })

  itShouldHaveNextValue(new RiskFactors({}, application), 'reducing-risk')
  itShouldHavePreviousValue(new RiskFactors({}, application), 'summary')

  describe('errors', () => {
    it('returns an error when required fields are blank', () => {
      const page = new RiskFactors({}, application)
      expect(page.errors()).toEqual({
        confirmation: errorLookups.oasysConfirmation.empty,
        circumstancesLikelyToIncreaseRisk: errorLookups.circumstancesLikelyToIncreaseRisk.empty,
        whenIsRiskLikelyToBeGreatest: errorLookups.whenIsRiskLikelyToBeGreatest.empty,
      })
    })
  })

  describe('items', () => {
    it('returns the checkbox as expected', () => {
      const page = new RiskFactors({}, application)

      expect(page.items()).toEqual([
        { value: 'confirmed', text: 'I confirm this information is relevant and up to date.', checked: false },
      ])
    })
  })
})
