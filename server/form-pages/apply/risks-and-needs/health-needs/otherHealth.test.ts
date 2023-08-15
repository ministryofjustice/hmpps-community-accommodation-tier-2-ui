import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import OtherHealth from './otherHealth'

describe('OtherHealth', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new OtherHealth({}, application)

      expect(page.title).toEqual('Other health needs for Roger Smith')
    })
  })

  describe('questions', () => {
    const page = new OtherHealth({}, application)

    describe('hasLongTermHealthCondition', () => {
      it('has a question, with a hint', () => {
        expect(page.questions.hasLongTermHealthCondition.question).toBeDefined()
        expect(page.questions.hasLongTermHealthCondition.hint).toBeDefined()
      })
      it('has 2 follow-up questions', () => {
        expect(page.questions.hasLongTermHealthCondition.healthConditionDetail.question).toBeDefined()
        expect(page.questions.hasLongTermHealthCondition.hasHadStroke.question).toBeDefined()
      })
    })

    describe('hasSeizures', () => {
      it('has a question', () => {
        expect(page.questions.hasSeizures.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.hasSeizures.seizuresDetail.question).toBeDefined()
      })
    })

    describe('beingTreatedForCancer', () => {
      it('has a question, with no follow-up', () => {
        expect(page.questions.beingTreatedForCancer.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new OtherHealth({}, application), '')
  itShouldHavePreviousValue(new OtherHealth({}, application), 'brain-injury')

  describe('response', () => {
    it('not implemented', () => {
      const page = new OtherHealth({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new OtherHealth({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
