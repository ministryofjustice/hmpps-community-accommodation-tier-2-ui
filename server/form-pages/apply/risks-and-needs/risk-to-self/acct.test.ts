import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import Acct from './acct'

describe('Acct', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('has a page title', () => {
      const page = new Acct({}, application)

      expect(page.title).toEqual('Assessment, Care in Custody and Teamwork (ACCT)')
    })
  })

  describe('when there is existing acct data', () => {
    it('should have accts', () => {
      const acctData = [
        {
          referringInstitution: 'institution',
          createdDate: [1, 2, 2012],
          expiryDate: [15, 10, 2012],
          acctDetails: 'detail info',
        },
      ]

      const acctDataUI = [
        {
          referringInstitution: 'institution',
          createdDate: '01/02/2012',
          expiryDate: '15/10/2012',
          acctDetails: 'detail info',
        },
      ]

      const applicationWithAccts = applicationFactory.build({
        person: personFactory.build({ name: 'Roger Smith' }),
        data: { 'risk-to-self': { 'acct-data': { acctData } } },
      })
      const page = new Acct({}, applicationWithAccts)

      expect(page.accts).toEqual(acctDataUI)
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
