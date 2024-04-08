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
            offenceGroupName: 'Stalking',
            offenceCategory: 'stalkingOrHarassment',
            numberOfOffences: '3',
            sentenceTypes: '1 custodial',
            summary: 'summary detail',
          },
          {
            offenceGroupName: 'Arson',
            offenceCategory: 'arson',
            numberOfOffences: '2',
            sentenceTypes: '2 suspended',
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
            offenceGroupName: 'Stalking',
            offenceCategoryTag: '<strong class="govuk-tag govuk-tag--blue">Stalking or Harassment</strong>',
            offenceCategoryText: 'Stalking or Harassment',
            numberOfOffences: '3',
            sentenceTypes: '1 custodial',
            summary: 'summary detail',
            removeLink: `/applications/${applicationWithData.id}/tasks/offending-history/pages/offence-history-data/0/removeFromList?redirectPage=offence-history`,
          },
          {
            offenceGroupName: 'Arson',
            offenceCategoryTag: '<strong class="govuk-tag govuk-tag--yellow">Arson</strong>',
            offenceCategoryText: 'Arson',
            numberOfOffences: '2',
            sentenceTypes: '2 suspended',
            summary: 'second summary detail',
            removeLink: `/applications/${applicationWithData.id}/tasks/offending-history/pages/offence-history-data/1/removeFromList?redirectPage=offence-history`,
          },
        ])
      })
    })

    describe('when there is offence data using the previous data model', () => {
      it('ignores the outdated data', () => {
        const applicationWithMixedData = applicationFactory.build({
          person: personFactory.build({ name: 'Roger Smith' }),
          data: {
            'offending-history': {
              'offence-history-data': [
                {
                  offenceGroupName: 'Stalking',
                  offenceCategory: 'stalkingOrHarassment',
                  numberOfOffences: '3',
                  sentenceTypes: '1 custodial',
                  summary: 'summary detail',
                },
                {
                  offenceGroupName: 'Arson',
                  offenceCategory: 'Arson',
                  'offenceDate-day': '5',
                  'offenceDate-month': '6',
                  'offenceDate-year': '1940',
                  sentenceLength: '3 years',
                  summary: 'summary detail',
                },
              ],
            },
          },
        })

        const page = new OffenceHistory({}, applicationWithMixedData)

        expect(page.offences).toEqual([
          {
            offenceGroupName: 'Stalking',
            numberOfOffences: '3',
            sentenceTypes: '1 custodial',
            summary: 'summary detail',
            offenceCategoryTag: '<strong class="govuk-tag govuk-tag--blue">Stalking or Harassment</strong>',
            offenceCategoryText: 'Stalking or Harassment',
            removeLink: `/applications/${applicationWithMixedData.id}/tasks/offending-history/pages/offence-history-data/0/removeFromList?redirectPage=offence-history`,
          },
        ])
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
          '<strong class="govuk-tag govuk-tag--blue">Stalking or Harassment</strong>':
            'Stalking\r\nNumber of offences: 3\r\nSentence types: 1 custodial\r\n\nDetails: summary detail',
          '<strong class="govuk-tag govuk-tag--yellow">Arson</strong>':
            'Arson\r\nNumber of offences: 2\r\nSentence types: 2 suspended\r\n\nDetails: second summary detail',
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

    describe('tableRows', () => {
      it('returns the rows correctly', () => {
        const page = new OffenceHistory({}, applicationWithData)

        const expected = [
          [
            {
              text: 'Stalking',
            },
            {
              text: 'Stalking or Harassment',
            },
            {
              text: '3',
            },
            {
              html: `<a href=/applications/${applicationWithData.id}/tasks/offending-history/pages/offence-history-data/0/removeFromList?redirectPage=offence-history>Remove</a>`,
            },
          ],
          [
            {
              text: 'Arson',
            },
            {
              text: 'Arson',
            },
            {
              text: '2',
            },
            {
              html: `<a href=/applications/${applicationWithData.id}/tasks/offending-history/pages/offence-history-data/1/removeFromList?redirectPage=offence-history>Remove</a>`,
            },
          ],
        ]

        expect(page.tableRows()).toEqual(expected)
      })
    })
  })
})
