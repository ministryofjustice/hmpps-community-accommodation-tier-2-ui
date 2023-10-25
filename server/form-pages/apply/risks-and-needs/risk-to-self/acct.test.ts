import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import Acct from './acct'

describe('Acct', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new Acct({}, application)

      expect(page.title).toEqual("Roger Smith's ACCT notes")
    })
  })

  describe('acct data', () => {
    describe('when there is acct data on the application', () => {
      it('assigns them to the accts field on the page', () => {
        const applicationWithData = applicationFactory.build({
          person: personFactory.build({ name: 'Roger Smith' }),
          data: {
            'risk-to-self': {
              'acct-data': [
                {
                  referringInstitution: 'institution',
                  'createdDate-day': '1',
                  'createdDate-month': '2',
                  'createdDate-year': '2012',
                  isOngoing: 'no',
                  'closedDate-day': '10',
                  'closedDate-month': '10',
                  'closedDate-year': '2013',
                  acctDetails: 'detail info',
                },
                {
                  referringInstitution: 'institution 2',
                  'createdDate-day': '2',
                  'createdDate-month': '3',
                  'createdDate-year': '2012',
                  isOngoing: 'yes',
                  acctDetails: 'detail info 2',
                },
              ],
            },
          },
        })

        const page = new Acct({}, applicationWithData)

        expect(page.accts).toEqual([
          {
            referringInstitution: 'institution',
            acctDetails: 'detail info',
            closedDate: '10 October 2013',
            createdDate: '1 February 2012',
            removeLink: `/applications/${applicationWithData.id}/tasks/risk-to-self/pages/acct-data/0/removeFromList?redirectPage=acct`,
            title: '1 February 2012 - 10 October 2013',
          },
          {
            referringInstitution: 'institution 2',
            acctDetails: 'detail info 2',
            closedDate: false,
            createdDate: '2 March 2012',
            removeLink: `/applications/${applicationWithData.id}/tasks/risk-to-self/pages/acct-data/1/removeFromList?redirectPage=acct`,
            title: '2 March 2012 - Ongoing',
          },
        ])
      })
    })
  })

  itShouldHaveNextValue(new Acct({}, application), 'additional-information')
  itShouldHavePreviousValue(new Acct({}, application), 'historical-risk')

  describe('response', () => {
    it('returns formatted ACCTs', () => {
      const page = new Acct({}, application)

      page.accts = [
        {
          title: 'acct 1',
          referringInstitution: 'hmp 1',
          acctDetails: 'some details',
          createdDate: 'created date',
          closedDate: 'closed date',
        },
        {
          title: 'acct 2',
          referringInstitution: 'hmp 2',
          acctDetails: 'some different details',
          createdDate: 'created date 2',
        },
      ]

      expect(page.response()).toEqual({
        'ACCT<br />Created: created date<br />Expiry: closed date': 'some details',
        'ACCT<br />Created: created date 2<br />Ongoing': 'some different details',
      })
    })

    it('returns empty object when no accts', () => {
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
