import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../../testutils/factories/index'
import AcctData from './acctData'

describe('AcctData', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  const acctData = [
    {
      referringInstitution: 'institution',
      'createdDate-day': '1',
      'createdDate-month': '2',
      'createdDate-year': '2012',
      isOngoing: 'yes',
      'closedDate-day': '10',
      'closedDate-month': '10',
      'closedDate-year': '2013',
      acctDetails: 'detail info',
    },
  ]

  describe('title', () => {
    it('has a page title', () => {
      const page = new AcctData({}, application)

      expect(page.title).toEqual('Add an ACCT entry')
    })
  })

  itShouldHaveNextValue(new AcctData({}, application), 'acct')
  itShouldHavePreviousValue(new AcctData({}, application), 'acct')

  describe('errors', () => {
    describe('when there are no errors', () => {
      it('returns empty object', () => {
        const page = new AcctData(acctData[0], application)
        expect(page.errors()).toEqual({})
      })
    })

    const requiredFields = [
      ['createdDate', 'Add a valid created date, for example 2 3 2013'],
      ['isOngoing', 'Select whether this ACCT is ongoing'],
      ['referringInstitution', 'Add a referring institution'],
      ['acctDetails', 'Enter the details of the ACCT'],
    ]

    it.each(requiredFields)('it includes a validation error for %s', (field, message) => {
      const page = new AcctData(
        {
          'createdDate-day': '',
          'createdDate-month': '',
          'createdDate-year': '',
          'closedDate-day': '',
          'closedDate-month': '',
          'closedDate-year': '',
          referringInstitution: '',
          isOngoing: undefined,
          acctDetails: '',
        },
        application,
      )
      const errors = page.errors()

      expect(errors[field]).toEqual(message)
    })

    describe('when an ACCT is ongoing but a closed date has not been given', () => {
      it('throws an error', () => {
        const page = new AcctData(
          {
            isOngoing: 'no',
          },
          application,
        )
        const errors = page.errors()

        expect(errors.closedDate).toEqual('Add a valid closed date, for example 2 3 2013')
      })
    })
  })

  describe('response', () => {
    it('returns empty object', () => {
      const page = new AcctData({}, application)
      expect(page.response()).toEqual({})
    })
  })
})
