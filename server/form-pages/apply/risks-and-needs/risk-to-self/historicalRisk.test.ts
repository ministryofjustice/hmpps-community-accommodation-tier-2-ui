import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import HistoricalRisk from './historicalRisk'

describe('HistoricalRisk', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new HistoricalRisk({}, application)

      expect(page.title).toEqual("Roger Smith's historical risks")
    })
  })

  describe('import date', () => {
    it('sets importDate to false where application contains no OASys import date', () => {
      const page = new HistoricalRisk({}, application)

      expect(page.importDate).toEqual(null)
    })
  })

  describe('Questions', () => {
    const page = new HistoricalRisk({}, application)

    describe('historicalRiskDetail', () => {
      it('has a question', () => {
        expect(page.questions.historicalRiskDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new HistoricalRisk({}, application), 'acct')
  itShouldHavePreviousValue(new HistoricalRisk({}, application), 'current-risk')

  describe('errors', () => {
    it('returns an error when the confirmation is blank', () => {
      const page = new HistoricalRisk({}, application)
      expect(page.errors()).toEqual({
        historicalRiskDetail: "Describe Roger Smith's historical issues and needs related to self harm and suicide",
        confirmation: 'Confirm that the information is relevant and up to date',
      })
    })
  })

  describe('items', () => {
    it('returns the checkbox as expected', () => {
      const page = new HistoricalRisk({}, application)

      expect(page.items()).toEqual([
        { value: 'confirmed', text: 'I confirm this information is relevant and up to date.', checked: false },
      ])
    })
  })
})
