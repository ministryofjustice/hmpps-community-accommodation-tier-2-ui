import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import Acct from './acct'

describe('Acct', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new Acct({}, application)

      expect(page.title).toEqual('Assessment, Care in Custody and Teamwork (ACCT)')
    })
  })

  itShouldHaveNextValue(new Acct({}, application), 'additional-information')
  itShouldHavePreviousValue(new Acct({}, application), 'historical-risk')

  describe('response', () => {
    it('returns empty object', () => {
      const page = new Acct({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('returns empty object', () => {
      const page = new Acct({}, application)
      expect(page.errors()).toEqual({})
    })
  })
})
