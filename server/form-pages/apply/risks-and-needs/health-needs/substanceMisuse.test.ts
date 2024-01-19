import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import SubstanceMisuse, { SubstanceMisuseBody } from './substanceMisuse'

describe('SubstanceMisuse', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new SubstanceMisuse({}, application)

      expect(page.title).toEqual('Substance misuse needs for Roger Smith')
    })
  })

  describe('Questions', () => {
    const page = new SubstanceMisuse({}, application)

    describe('usesIllegalSubstances', () => {
      it('has a question', () => {
        expect(page.questions.usesIllegalSubstances.question).toBeDefined()
      })
      it('has two follow-up questions', () => {
        expect(page.questions.substanceMisuseHistory.question).toBeDefined()
      })
    })

    describe('engagedWithDrugAndAlcoholService', () => {
      it('has a question', () => {
        expect(page.questions.engagedWithDrugAndAlcoholService.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.drugAndAlcoholServiceDetail.question).toBeDefined()
      })
    })

    describe('substituteMedication', () => {
      it('has a question', () => {
        expect(page.questions.requiresSubstituteMedication.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.substituteMedicationDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new SubstanceMisuse({}, application), 'physical-health')
  itShouldHavePreviousValue(new SubstanceMisuse({}, application), 'taskList')

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

      it('includes a validation error for _intentToReferToServiceOnRelease_', () => {
        expect(page.errors()).toHaveProperty(
          'intentToReferToServiceOnRelease',
          'Confirm whether they will be referred to a drug and alcohol service after release',
        )
      })

      it('includes a validation error for _requiresSubstituteMedication_', () => {
        expect(page.errors()).toHaveProperty(
          'requiresSubstituteMedication',
          'Confirm whether they require substitute medication',
        )
      })

      it('includes a validation error for _releasedWithNaloxone_', () => {
        expect(page.errors()).toHaveProperty(
          'releasedWithNaloxone',
          "Confirm whether they will be released with naloxone or select 'I don’t know'",
        )
      })
    })

    describe('when _usesIllegalSubstances_ is YES', () => {
      const page = new SubstanceMisuse({ usesIllegalSubstances: 'yes' }, application)

      describe('and _substanceMisuseHistory_ is UNANSWERED', () => {
        it('includes a validation error for _substanceMisuseHistory_', () => {
          expect(page.errors()).toHaveProperty('substanceMisuseHistory', 'Name the illegal substances they take')
        })
      })
    })

    describe('when _requiresSubstituteMedication_ is YES', () => {
      const page = new SubstanceMisuse({ requiresSubstituteMedication: 'yes' }, application)

      describe('and _substituteMedicationDetail_ is UNANSWERED', () => {
        it('includes a validation error for _substituteMedicationDetail_', () => {
          expect(page.errors()).toHaveProperty(
            'substituteMedicationDetail',
            'Provide details of their substitute medication',
          )
        })
      })
    })
  })

  describe('onSave', () => {
    it('removes illegal substance data if answer is no', () => {
      const body: Partial<SubstanceMisuseBody> = {
        usesIllegalSubstances: 'no',
        substanceMisuseHistory: 'Substance misuse history',
      }

      const page = new SubstanceMisuse(body, application)

      page.onSave()

      expect(page.body).toEqual({
        usesIllegalSubstances: 'no',
      })
    })

    it('removes drug and alcohol service data if answer is no', () => {
      const body: Partial<SubstanceMisuseBody> = {
        intentToReferToServiceOnRelease: 'no',
        drugAndAlcoholServiceDetail: 'Drug and alcohol service detail',
      }

      const page = new SubstanceMisuse(body, application)

      page.onSave()

      expect(page.body).toEqual({
        intentToReferToServiceOnRelease: 'no',
      })
    })

    it('removes substitute medical data if answer is no', () => {
      const body: Partial<SubstanceMisuseBody> = {
        requiresSubstituteMedication: 'no',
        substituteMedicationDetail: 'Substitute medical detail',
      }

      const page = new SubstanceMisuse(body, application)

      page.onSave()

      expect(page.body).toEqual({
        requiresSubstituteMedication: 'no',
      })
    })
  })
})
