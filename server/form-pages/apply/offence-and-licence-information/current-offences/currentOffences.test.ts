import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import CurrentOffences from './currentOffences'
import CurrentOffenceData from './custom-forms/currentOffenceData'

jest.mock('./custom-forms/currentOffenceData')

describe('CurrentOffences', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  const applicationWithData = applicationFactory.build({
    person: personFactory.build({ name: 'Roger Smith' }),
    data: {
      'current-offences': {
        'current-offence-data': [
          {
            titleAndNumber: 'Stalking',
            offenceCategory: 'stalkingOrHarassment',
            'offenceDate-day': '1',
            'offenceDate-month': '2',
            'offenceDate-year': '2023',
            sentenceLength: '12 months',
            summary: 'summary detail',
            outstandingCharges: 'yes',
            outstandingChargesDetail: 'some detail',
          },
          {
            titleAndNumber: 'Arson',
            offenceCategory: 'arson',
            'offenceDate-day': '5',
            'offenceDate-month': '6',
            'offenceDate-year': '1940',
            sentenceLength: '3 years',
            summary: 'second summary detail',
            outstandingCharges: 'no',
            outstandingChargesDetail: '',
          },
        ],
      },
    },
  })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new CurrentOffences({}, application)

      expect(page.title).toEqual('Current offences for Roger Smith')
    })
  })

  describe('current offence data', () => {
    describe('when there is current offence data on the application', () => {
      it('assigns them to the offences field on the page', () => {
        const page = new CurrentOffences({}, applicationWithData)

        expect(page.offences).toEqual([
          {
            titleAndNumber: 'Stalking',
            offenceCategoryTag: '<strong class="govuk-tag govuk-tag--blue">Stalking or Harassment</strong>',
            offenceCategoryText: 'Stalking or Harassment',
            offenceDate: '1 February 2023',
            sentenceLength: '12 months',
            summary: 'summary detail',
            outstandingCharges: 'Yes',
            outstandingChargesDetail: 'some detail',
            removeLink: `/applications/${applicationWithData.id}/tasks/current-offences/pages/current-offence-data/0/removeFromList?redirectPage=current-offences`,
          },
          {
            titleAndNumber: 'Arson',
            offenceCategoryTag: '<strong class="govuk-tag govuk-tag--yellow">Arson</strong>',
            offenceCategoryText: 'Arson',
            offenceDate: '5 June 1940',
            sentenceLength: '3 years',
            summary: 'second summary detail',
            outstandingCharges: 'No',
            outstandingChargesDetail: '',
            removeLink: `/applications/${applicationWithData.id}/tasks/current-offences/pages/current-offence-data/1/removeFromList?redirectPage=current-offences`,
          },
        ])
      })
    })
  })

  itShouldHaveNextValue(new CurrentOffences({}, application), '')
  itShouldHavePreviousValue(new CurrentOffences({}, application), 'taskList')

  describe('errors', () => {
    it('returns an empty object where there is current offence data', () => {
      const page = new CurrentOffences({}, applicationWithData)
      expect(page.errors()).toEqual({})
    })

    it('returns an error where there is no current offence data', () => {
      const page = new CurrentOffences({}, application)
      expect(page.errors()).toEqual({ offenceList: 'Current offences must be added to the application' })
    })
  })

  describe('response', () => {
    it('returns the offence information', () => {
      const page = new CurrentOffences({}, applicationWithData)
      expect(page.response()).toEqual({
        'Current offence 1':
          'Stalking\r\nStalking or Harassment\r\n1 February 2023\r\n12 months\r\n\nSummary: summary detail\r\nOutstanding charges: Yes\r\nDetails of outstanding charges: some detail',
        'Current offence 2':
          'Arson\r\nArson\r\n5 June 1940\r\n3 years\r\n\nSummary: second summary detail\r\nOutstanding charges: No',
      })
    })

    it('returns empty object when there are no offences', () => {
      const page = new CurrentOffences({}, application)
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
      const page = new CurrentOffences({}, applicationWithData)
      expect(page.getOffenceTagColour(category)).toEqual(colour)
    })
  })

  describe('initialize', () => {
    it('returns CurrentOffenceData page if there is no current offences data', () => {
      const currentOffenceDataPageConstructor = jest.fn()

      ;(CurrentOffenceData as jest.Mock).mockImplementation(() => {
        return currentOffenceDataPageConstructor
      })

      CurrentOffences.initialize({}, application)

      expect(CurrentOffenceData).toHaveBeenCalledWith({}, application)
    })

    it('returns CurrentOffence page if there is current offences data', async () => {
      const page = (await CurrentOffences.initialize({}, applicationWithData)) as CurrentOffences

      expect(page.title).toBe('Current offences for Roger Smith')
    })
  })
})
