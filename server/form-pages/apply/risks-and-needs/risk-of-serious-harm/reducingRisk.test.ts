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

  itShouldHaveNextValue(new ReducingRisk({}, application), '')
  itShouldHavePreviousValue(new ReducingRisk({}, application), 'risk-factors')

  describe('response', () => {
    it('not implemented', () => {
      const page = new ReducingRisk({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new ReducingRisk({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
