import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import OtherHealth from './otherHealth'

describe('OtherHealth', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new OtherHealth({}, application)

      expect(page.title).toEqual('Other health needs for Roger Smith')
    })
  })

  itShouldHaveNextValue(new OtherHealth({}, application), '')
  itShouldHavePreviousValue(new OtherHealth({}, application), 'brain-injury')

  describe('response', () => {
    it('not implemented', () => {
      const page = new OtherHealth({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new OtherHealth({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
