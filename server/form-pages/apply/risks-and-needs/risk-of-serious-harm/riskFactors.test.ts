import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import RiskFactors from './riskFactors'

describe('RiskFactors', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new RiskFactors({}, application)

      expect(page.title).toEqual(`Risk factors for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new RiskFactors({}, application), '')
  itShouldHavePreviousValue(new RiskFactors({}, application), 'summary')

  describe('response', () => {
    it('not implemented', () => {
      const page = new RiskFactors({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new RiskFactors({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
