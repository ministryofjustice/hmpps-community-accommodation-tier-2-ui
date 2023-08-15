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
    it('returns the correct plain english responses for the questions', () => {
      const page = new LearningDifficulties(
        {
          hasLearningNeeds: 'yes',
          needsDetail: 'Has ADHD',
          isVulnerable: 'yes',
          vulnerabilityDetail: 'Moderate: is prone to risky behaviour',
          hasDifficultyInteracting: 'yes',
          interactionDetail: 'Can be withdrawn',
          requiresAdditionalSupport: 'yes',
          addSupportDetail: 'Daily support is needed',
        },
        application,
      )

      expect(page.response()).toEqual({
        'Do they have any additional needs relating to learning difficulties or neurodiversity?': 'Yes',
        'Please describe their additional needs.': 'Has ADHD',
        'Are they vulnerable as a result of this condition?': 'Yes',
        'Please describe their level of vulnerability.': 'Moderate: is prone to risky behaviour',
        'Do they have difficulties interacting with other people as a result of this condition?': 'Yes',
        'Please describe these difficulties.': 'Can be withdrawn',
        'Is additional support required?': 'Yes',
        'Please describe the type of support.': 'Daily support is needed',
      })
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new LearningDifficulties({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
