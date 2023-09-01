import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import AcctData from './acctData'

describe('AcctData', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  const acctData = [
    {
      referringInstitution: 'institution',
      createdDate: ['1', '2', '2012'],
      expiryDate: ['15', '10', '2012'],
      acctDetails: 'detail info',
    },
  ]

  describe('title', () => {
    it('has a page title', () => {
      const page = new AcctData({}, application)

      expect(page.title).toEqual('Add an ACCT entry')
    })
  })

  describe('when there is existing acct data', () => {
    it('should have accts', () => {
      const applicationWithAccts = applicationFactory.build({
        person: personFactory.build({ name: 'Roger Smith' }),
        data: { 'risk-to-self': { 'acct-data': { acctData } } },
      })
      const page = new AcctData({}, applicationWithAccts)

      expect(page.existingAccts).toEqual(acctData)
    })
  })

  itShouldHaveNextValue(new AcctData({}, application), 'acct')
  itShouldHavePreviousValue(new AcctData({}, application), 'acct')

  describe('response', () => {
    it('returns empty object', () => {
      const page = new AcctData({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    describe('when there are no errors', () => {
      it('returns empty object', () => {
        const page = new AcctData({ acctData }, application)
        expect(page.errors()).toEqual({})
      })
    })

    const requiredFields = [
      ['acctData[0][createdDate]', 'Add a valid created date, for example 2 3 2013'],
      ['acctData[0][expiryDate]', 'Add a valid expiry date, for example 2 3 2013'],
      ['acctData[0][referringInstitution]', 'Add a referring institution'],
      ['acctData[0][acctDetails]', 'Enter the details of the ACCT'],
    ]

    it.each(requiredFields)('it includes a validation error for %s', (field, message) => {
      const page = new AcctData(
        {
          acctData: [
            {
              createdDate: [],
              expiryDate: [],
              referringInstitution: '',
              acctDetails: '',
            },
          ],
        },
        application,
      )
      const errors = page.errors()

      expect(errors[field]).toEqual(message)
    })
  })
})
