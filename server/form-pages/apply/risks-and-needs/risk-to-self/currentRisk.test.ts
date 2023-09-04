import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import CurrentRisk from './currentRisk'

describe('CurrentRisk', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new CurrentRisk({}, application)

      expect(page.title).toEqual("Roger Smith's current risks")
    })
  })

  describe('import date', () => {
    it('sets importDate to false where application contains no OASys import date', () => {
      const page = new CurrentRisk({}, application)

      expect(page.importDate).toEqual(null)
    })
  })

  describe('Questions', () => {
    const page = new CurrentRisk({}, application)

    describe('currentRiskDetail', () => {
      it('has a question', () => {
        expect(page.questions.currentRiskDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new CurrentRisk({}, application), 'historical-risk')
  itShouldHavePreviousValue(new CurrentRisk({}, application), 'vulnerability')

  describe('response', () => {
    it('returns the correct plain english responses for the questions', () => {
      const page = new CurrentRisk(
        {
          currentRiskDetail: 'is at risk',
        },
        application,
      )

      expect(page.response()).toEqual({
        "Describe Roger Smith's current issues and needs related to self harm and suicide": 'is at risk',
      })
    })
  })

  describe('errors', () => {
    it('returns an error when the confirmation is blank', () => {
      const page = new CurrentRisk({}, application)
      expect(page.errors()).toEqual({
        confirmation: 'Confirm that the information is relevant and up to date',
      })
    })
  })

  describe('items', () => {
    it('returns the checkbox as expected', () => {
      const page = new CurrentRisk({}, application)

      expect(page.items()).toEqual([
        { value: 'confirmed', text: 'I confirm this information is relevant and up to date.', checked: false },
      ])
    })
  })
})
