import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import LearningDifficulties from './learningDifficulties'

describe('LearningDifficulties', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new LearningDifficulties({}, application)

      expect(page.title).toEqual('Learning difficulties and neurodiversity for Roger Smith')
    })
  })

  describe('questions', () => {
    const page = new LearningDifficulties({}, application)

    describe('hasLearningNeeds', () => {
      it('has a question', () => {
        expect(page.questions.hasLearningNeeds.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.hasLearningNeeds.needsDetail.question).toBeDefined()
      })
    })

    describe('isVulnerable', () => {
      it('has a question', () => {
        expect(page.questions.isVulnerable.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.isVulnerable.vulnerabilityDetail.question).toBeDefined()
      })
    })

    describe('hasDifficultyInteracting', () => {
      it('has a question', () => {
        expect(page.questions.hasDifficultyInteracting.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.hasDifficultyInteracting.interactionDetail.question).toBeDefined()
      })
    })

    describe('requiresAdditionalSupport', () => {
      it('has a question', () => {
        expect(page.questions.requiresAdditionalSupport.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.requiresAdditionalSupport.addSupportDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new LearningDifficulties({}, application), 'brain-injury')
  itShouldHavePreviousValue(new LearningDifficulties({}, application), 'communication-and-language')

  describe('response', () => {
    it('not implemented', () => {
      const page = new LearningDifficulties({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new LearningDifficulties({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
