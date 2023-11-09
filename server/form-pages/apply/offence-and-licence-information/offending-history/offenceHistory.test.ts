import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import OffenceHistory from './offenceHistory'

describe('OffenceHistory', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  const applicationWithData = applicationFactory.build({
    person: personFactory.build({ name: 'Roger Smith' }),
    data: {
      'offending-history': {
        'offence-history-data': [
          {
            titleAndNumber: 'Stalking (08000)',
            offenceCategory: 'stalkingOrHarassment',
            'offenceDate-day': '1',
            'offenceDate-month': '2',
            'offenceDate-year': '2023',
            sentenceLength: '12 months',
            summary: 'summary detail',
          },
          {
            titleAndNumber: 'Arson (09000)',
            offenceCategory: 'arson',
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

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new OffenceHistory({}, application)

      expect(page.title).toEqual('Offence history for Roger Smith')
    })
  })

  describe('offence history data', () => {
    describe('when there is offence history data on the application', () => {
      it('assigns them to the offences field on the page', () => {
        const page = new OffenceHistory({}, applicationWithData)

        expect(page.offences).toEqual([
          {
            titleAndNumber: 'Stalking (08000)',
            offenceCategoryTag: '<strong class="govuk-tag govuk-tag--blue">Stalking or Harassment</strong>',
            offenceCategoryText: 'Stalking or Harassment',
            offenceDate: '1 February 2023',
            sentenceLength: '12 months',
            summary: 'summary detail',
            removeLink: `/applications/${applicationWithData.id}/tasks/offending-history/pages/offence-history-data/0/removeFromList?redirectPage=offence-history`,
          },
          {
            titleAndNumber: 'Arson (09000)',
            offenceCategoryTag: '<strong class="govuk-tag govuk-tag--yellow">Arson</strong>',
            offenceCategoryText: 'Arson',
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

  describe('response', () => {
    it('returns the offence information', () => {
      const page = new OffenceHistory({}, applicationWithData)
      expect(page.response()).toEqual({
        'Historical offence 1':
          'Stalking (08000)\r\nStalking or Harassment\r\n1 February 2023\r\n12 months\r\n\nSummary: summary detail',
        'Historical offence 2': 'Arson (09000)\r\nArson\r\n5 June 1940\r\n3 years\r\n\nSummary: second summary detail',
      })
    })

    it('returns empty object when there are no offences', () => {
      const page = new OffenceHistory({}, application)
      expect(page.response()).toEqual({})
    })
  })

  describe('getOffenceTagColour', () => {
    const categories = [
      ['stalkingOrHarassment', 'blue'],
      ['weaponsOrFirearms', 'red'],
      ['arson', 'yellow'],
      ['violence', 'pink'],
      ['domesticAbuse', 'purple'],
      ['hateCrime', 'green'],
      ['drugs', 'custom-brown'],
      ['other', 'grey'],
      ['undefinedCategory', 'grey'],
    ]
    it.each(categories)('returns correct colour for category %s', (category, colour) => {
      const page = new OffenceHistory({}, applicationWithData)
      expect(page.getOffenceTagColour(category)).toEqual(colour)
    })
  })
})
