import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import SubstanceMisuse from './substanceMisuse'

describe('SubstanceMisuse', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new SubstanceMisuse({}, application)

      expect(page.title).toEqual('Health needs for Roger Smith')
    })
  })

  describe('Questions', () => {
    const page = new SubstanceMisuse({}, application)

    describe('usesIllegalSubstances', () => {
      it('has a question', () => {
        expect(page.questions.usesIllegalSubstances.question).toBeDefined()
      })
      it('has two follow-up questions, one with a hint', () => {
        expect(page.questions.usesIllegalSubstances.substanceMisuseHistory.question).toBeDefined()
        expect(page.questions.usesIllegalSubstances.substanceMisuseHistory.hint).toBeDefined()

        expect(page.questions.usesIllegalSubstances.substanceMisuseDetail.question).toBeDefined()
      })
    })

    describe('engagedWithDrugAndAlcoholService', () => {
      it('has a question', () => {
        expect(page.questions.engagedWithDrugAndAlcoholService.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.engagedWithDrugAndAlcoholService.drugAndAlcoholServiceDetail.question).toBeDefined()
      })
    })

    describe('substituteMedication', () => {
      it('has a question', () => {
        expect(page.questions.requiresSubstituteMedication.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.requiresSubstituteMedication.substituteMedicationDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new SubstanceMisuse({}, application), 'physical-health')
  itShouldHavePreviousValue(new SubstanceMisuse({}, application), 'taskList')

  describe('response', () => {
    it('not implemented', () => {
      const page = new SubstanceMisuse({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    describe('when top-level questions are unanswered', () => {
      const page = new SubstanceMisuse({}, application)

      it('includes a validation error for _usesIllegalSubstances_', () => {
        expect(page.errors()).toHaveProperty(
          'usesIllegalSubstances',
          'Confirm whether they take any illegal substances',
        )
      })

      it('includes a validation error for _engagedWithDrugAndAlcoholService_', () => {
        expect(page.errors()).toHaveProperty(
          'engagedWithDrugAndAlcoholService',
          'Confirm whether they are engaged with a drug and alcohol service',
        )
      })

      it('includes a validation error for _requiresSubstituteMedication_', () => {
        expect(page.errors()).toHaveProperty(
          'requiresSubstituteMedication',
          'Confirm whether they require substitute medication',
        )
      })
    })

    describe('when _usesIllegalSubstances_ is YES', () => {
      const page = new SubstanceMisuse({ usesIllegalSubstances: 'yes' }, application)

      describe('and _substanceMisuseHistory_ is UNANSWERED', () => {
        it('includes a validation error for _substanceMisuseHistory_', () => {
          expect(page.errors()).toHaveProperty(
            'substanceMisuseHistory',
            'Provide details of their recent history of substance abuse',
          )
        })
      })

      describe('and _substanceMisuseDetail_ is UNANSWERED', () => {
        it('includes a validation error for _substanceMisuseDetail_', () => {
          expect(page.errors()).toHaveProperty(
            'substanceMisuseDetail',
            'Provide details of how often they take these substances',
          )
        })
      })
    })
  })
})
