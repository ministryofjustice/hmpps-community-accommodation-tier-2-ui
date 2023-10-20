import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import ReducingRisk from './reducingRisk'

describe('ReducingRisk', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new ReducingRisk({}, application)

      expect(page.title).toEqual(`Reducing risk for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new ReducingRisk({}, application), 'risk-management-arrangements')
  itShouldHavePreviousValue(new ReducingRisk({}, application), 'risk-factors')

  describe('errors', () => {
    it('returns an error when required fields are blank', () => {
      const page = new ReducingRisk({}, application)
      expect(page.errors()).toEqual({
        confirmation: 'Confirm that the information is relevant and up to date',
        factorsLikelyToReduceRisk: 'Enter the factors that are likely to reduce risk',
      })
    })
  })

  describe('items', () => {
    it('returns the checkbox as expected', () => {
      const page = new ReducingRisk({}, application)

      expect(page.items()).toEqual([
        { value: 'confirmed', text: 'I confirm this information is relevant and up to date.', checked: false },
      ])
    })
  })
})
