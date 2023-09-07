import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import RiskManagementArrangements from './riskManagementArrangements'

describe('RiskManagementArrangements', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new RiskManagementArrangements({}, application)

      expect(page.title).toEqual(`Risk management arrangements for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new RiskManagementArrangements({}, application), '')
  itShouldHavePreviousValue(new RiskManagementArrangements({}, application), 'reducing-risk')

  describe('response', () => {
    it('not implemented', () => {
      const page = new RiskManagementArrangements({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new RiskManagementArrangements({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
