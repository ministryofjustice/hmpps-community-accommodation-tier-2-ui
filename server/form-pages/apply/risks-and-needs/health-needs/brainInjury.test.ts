import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import BrainInjury from './brainInjury'

describe('BrainInjury', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new BrainInjury({}, application)

      expect(page.title).toEqual('Brain injury needs for Roger Smith')
    })
  })

  describe('questions', () => {
    const page = new BrainInjury({}, application)

    describe('hasBrainInjury', () => {
      it('has a question', () => {
        expect(page.questions.hasBrainInjury.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.hasBrainInjury.injuryDetail.question).toBeDefined()
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

  itShouldHaveNextValue(new BrainInjury({}, application), 'other-health')
  itShouldHavePreviousValue(new BrainInjury({}, application), 'learning-difficulties')

  describe('response', () => {
    it('not implemented', () => {
      const page = new BrainInjury({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new BrainInjury({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
