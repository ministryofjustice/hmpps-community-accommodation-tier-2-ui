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
    it('returns empty object', () => {
      const page = new CurrentRisk({}, application)
      expect(page.errors()).toEqual({})
    })
  })
})
