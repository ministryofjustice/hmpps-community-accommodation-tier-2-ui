import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import LearningDifficulties, { LearningDifficultiesBody } from './learningDifficulties'

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
        expect(page.questions.needsDetail.question).toBeDefined()
      })
    })

    describe('isVulnerable', () => {
      it('has a question', () => {
        expect(page.questions.isVulnerable.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.vulnerabilityDetail.question).toBeDefined()
      })
    })

    describe('hasDifficultyInteracting', () => {
      it('has a question', () => {
        expect(page.questions.hasDifficultyInteracting.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.interactionDetail.question).toBeDefined()
      })
    })

    describe('requiresAdditionalSupport', () => {
      it('has a question', () => {
        expect(page.questions.requiresAdditionalSupport.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.addSupportDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new LearningDifficulties({}, application), 'brain-injury')
  itShouldHavePreviousValue(new LearningDifficulties({}, application), 'communication-and-language')

  describe('errors', () => {
    describe('when top-level questions are unanswered', () => {
      const page = new LearningDifficulties({}, application)

      it('includes a validation error for _hasLearningNeeds_', () => {
        expect(page.errors()).toHaveProperty('hasLearningNeeds', 'Confirm whether they have additional needs')
      })

      it('includes a validation error for _isVulnerable_', () => {
        expect(page.errors()).toHaveProperty('isVulnerable', 'Confirm whether they are vulnerable')
      })

      it('includes a validation error for _hasDifficultyInteracting_', () => {
        expect(page.errors()).toHaveProperty(
          'hasDifficultyInteracting',
          'Confirm whether they have difficulties interacting',
        )
      })

      it('includes a validation error for _requiresAdditionalSupport_', () => {
        expect(page.errors()).toHaveProperty(
          'requiresAdditionalSupport',
          'Confirm whether additional support is required',
        )
      })
    })

    describe('when _hasLearningNeeds_ is YES', () => {
      const page = new LearningDifficulties({ hasLearningNeeds: 'yes' }, application)

      describe('and _needsDetail_ is UNANSWERED', () => {
        it('includes a validation error for _needsDetail_', () => {
          expect(page.errors()).toHaveProperty(
            'needsDetail',
            'Describe their additional needs relating to learning difficulties or neurodiversity',
          )
        })
      })
    })

    describe('when _isVulnerable_ is YES', () => {
      const page = new LearningDifficulties({ isVulnerable: 'yes' }, application)

      describe('and _vulnerabilityDetail_ is UNANSWERED', () => {
        it('includes a validation error for _vulnerabilityDetail_', () => {
          expect(page.errors()).toHaveProperty('vulnerabilityDetail', 'Describe their level of vulnerability')
        })
      })
    })

    describe('when _hasDifficultyInteracting_ is YES', () => {
      const page = new LearningDifficulties({ hasDifficultyInteracting: 'yes' }, application)

      describe('and _interactionDetail_ is UNANSWERED', () => {
        it('includes a validation error for _interactionDetail_', () => {
          expect(page.errors()).toHaveProperty(
            'interactionDetail',
            'Describe their difficulties interacting with other people',
          )
        })
      })
    })

    describe('when _requiresAdditionalSupport_ is YES', () => {
      const page = new LearningDifficulties({ requiresAdditionalSupport: 'yes' }, application)

      describe('and _addSupportDetail_ is UNANSWERED', () => {
        it('includes a validation error for _addSupportDetail_', () => {
          expect(page.errors()).toHaveProperty('addSupportDetail', 'Describe the type of support required')
        })
      })
    })
  })

  it('removes learning needs data when the question is set to "no"', () => {
    const body: Partial<LearningDifficultiesBody> = {
      hasLearningNeeds: 'no',
      needsDetail: 'Learning needs detail',
    }

    const page = new LearningDifficulties(body, application)

    page.onSave()

    expect(page.body).toEqual({
      hasLearningNeeds: 'no',
    })
  })

  it('removes vulnerability data when the question is set to "no"', () => {
    const body: Partial<LearningDifficultiesBody> = {
      isVulnerable: 'no',
      vulnerabilityDetail: 'Vulnerability detail',
    }

    const page = new LearningDifficulties(body, application)

    page.onSave()

    expect(page.body).toEqual({
      isVulnerable: 'no',
    })
  })

  it('removes interaction difficulty data when the question is set to "no"', () => {
    const body: Partial<LearningDifficultiesBody> = {
      hasDifficultyInteracting: 'no',
      interactionDetail: 'Interaction detail',
    }

    const page = new LearningDifficulties(body, application)

    page.onSave()

    expect(page.body).toEqual({
      hasDifficultyInteracting: 'no',
    })
  })

  it('removes additional support data when the question is set to "no"', () => {
    const body: Partial<LearningDifficultiesBody> = {
      requiresAdditionalSupport: 'no',
      addSupportDetail: 'Additional support detail',
    }

    const page = new LearningDifficulties(body, application)

    page.onSave()

    expect(page.body).toEqual({
      requiresAdditionalSupport: 'no',
    })
  })
})
