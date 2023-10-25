import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import OffenceHistory from './offenceHistory'

describe('OffenceHistory', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new OffenceHistory({}, application)

      expect(page.title).toEqual('Offence history for Roger Smith')
    })
  })

  describe('offence history data', () => {
    describe('when there is offence history data on the application', () => {
      it('assigns them to the offences field on the page', () => {
        const applicationWithData = applicationFactory.build({
          person: personFactory.build({ name: 'Roger Smith' }),
          data: {
            'offending-history': {
              'offence-history-data': [
                {
                  titleAndNumber: 'Stalking (08000)',
                  offenceCategory: 'Stalking',
                  'offenceDate-day': '1',
                  'offenceDate-month': '2',
                  'offenceDate-year': '2023',
                  sentenceLength: '12 months',
                  summary: 'summary detail',
                },
                {
                  titleAndNumber: 'Arson (09000)',
                  offenceCategory: 'Arson',
                  'offenceDate-day': '5',
                  'offenceDate-month': '6',
                  'offenceDate-year': '1940',
                  sentenceLength: '3 years',
                  summary: 'second summary detail',
                },
              ],
            },
          },
        })

        const page = new OffenceHistory({}, applicationWithData)

        expect(page.offences).toEqual([
          {
            titleAndNumber: 'Stalking (08000)',
            offenceCategory: 'Stalking',
            offenceDate: '1 February 2023',
            sentenceLength: '12 months',
            summary: 'summary detail',
            removeLink: `/applications/${applicationWithData.id}/tasks/offending-history/pages/offence-history-data/0/removeFromList?redirectPage=offence-history`,
          },
          {
            titleAndNumber: 'Arson (09000)',
            offenceCategory: 'Arson',
            offenceDate: '5 June 1940',
            sentenceLength: '3 years',
            summary: 'second summary detail',
            removeLink: `/applications/${applicationWithData.id}/tasks/offending-history/pages/offence-history-data/1/removeFromList?redirectPage=offence-history`,
          },
        ])
      })
    })
  })

  itShouldHaveNextValue(new OffenceHistory({}, application), '')
  itShouldHavePreviousValue(new OffenceHistory({}, application), 'any-previous-convictions')

  describe('errors', () => {
    it('returns empty object', () => {
      const page = new OffenceHistory({}, application)
      expect(page.errors()).toEqual({})
    })
  })
})
