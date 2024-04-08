import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../../testutils/factories/index'
import OffenceHistoryData from './offenceHistoryData'

describe('OffenceHistoryData', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  const offenceHistoryData = [
    {
      offenceGroupName: 'Stalking',
      offenceCategory: 'Arson',
      numberOfOffences: '3',
      sentenceTypes: '1 custodial',
      summary: 'summary detail',
    },
  ]

  describe('title', () => {
    it('has a page title', () => {
      const page = new OffenceHistoryData({}, application)

      expect(page.title).toEqual('Add a previous offence for Roger Smith')
    })
  })

  itShouldHaveNextValue(new OffenceHistoryData({}, application), 'offence-history')
  itShouldHavePreviousValue(new OffenceHistoryData({}, application), 'offence-history')

  describe('errors', () => {
    describe('when there are no errors', () => {
      it('returns empty object', () => {
        const page = new OffenceHistoryData(offenceHistoryData[0], application)
        expect(page.errors()).toEqual({})
      })
    })

    const requiredFields = [
      ['offenceGroupName', 'Enter the offence group name'],
      ['offenceCategory', 'Select the offence type'],
      ['numberOfOffences', 'Enter the number of offences'],
      ['sentenceTypes', 'Enter the sentence type(s)'],
      ['summary', 'Enter the offence details'],
    ]

    it.each(requiredFields)('it includes a validation error for %s', (field, message) => {
      const page = new OffenceHistoryData({ offenceCategory: 'choose' }, application)
      const errors = page.errors()

      expect(errors[field]).toEqual(message)
    })
  })

  describe('response', () => {
    it('returns empty object', () => {
      const page = new OffenceHistoryData({}, application)
      expect(page.response()).toEqual({})
    })
  })
})
