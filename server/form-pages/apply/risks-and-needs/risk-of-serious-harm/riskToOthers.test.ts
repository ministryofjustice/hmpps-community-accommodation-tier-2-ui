import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import RiskToOthers from './riskToOthers'

describe('RiskToOthers', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new RiskToOthers({}, application)

      expect(page.title).toEqual(`Risk to others for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new RiskToOthers({}, application), '')
  itShouldHavePreviousValue(new RiskToOthers({}, application), 'summary')

  describe('response', () => {
    it('not implemented', () => {
      const page = new RiskToOthers({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new RiskToOthers({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
