import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import PhysicalHealth, { PhysicalHealthBody } from './physicalHealth'

describe('PhysicalHealth', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new PhysicalHealth({}, application)

      expect(page.title).toEqual('Physical health needs for Roger Smith')
    })
  })

  itShouldHaveNextValue(new PhysicalHealth({}, application), 'mental-health')
  itShouldHavePreviousValue(new PhysicalHealth({}, application), 'substance-misuse')

  describe('Questions', () => {
    const page = new PhysicalHealth({}, application)

    describe('hasPhyHealthNeeds', () => {
      it('has a question', () => {
        expect(page.questions.hasPhyHealthNeeds.question).toBeDefined()
      })
      it('has two follow-up questions', () => {
        expect(page.questions.needsDetail.question).toBeDefined()
        expect(page.questions.canClimbStairs.question).toBeDefined()
      })
    })

    describe('isReceivingMedicationOrTreatment', () => {
      it('has a question', () => {
        expect(page.questions.isReceivingMedicationOrTreatment.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.medicationOrTreatmentDetail.question).toBeDefined()
      })
    })

    describe('canLiveIndependently', () => {
      it('has a question', () => {
        expect(page.questions.canLiveIndependently.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.indyLivingDetail.question).toBeDefined()
      })
    })

    describe('requiresAdditionalSupport', () => {
      it('has a question', () => {
        expect(page.questions.requiresAdditionalSupport.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.addSupportDetail.question).toBeDefined()
      })
    })
  })

  describe('errors', () => {
    describe('when top-level questions are unanswered', () => {
      const page = new PhysicalHealth({}, application)

      it('includes a validation error for _hasPhyHealthNeeds_', () => {
        expect(page.errors()).toHaveProperty('hasPhyHealthNeeds', 'Confirm whether they have physical health needs')
      })

      it('includes a validation error for _isReceivingMedicationOrTreatment_', () => {
        expect(page.errors()).toHaveProperty(
          'isReceivingMedicationOrTreatment',
          'Confirm whether they are currently receiving any medication or treatment',
        )
      })

      it('includes a validation error for _canLiveIndependently_', () => {
        expect(page.errors()).toHaveProperty('canLiveIndependently', 'Confirm whether they can live independently')
      })

      it('includes a validation error for _requiresAdditionalSupport_', () => {
        expect(page.errors()).toHaveProperty(
          'requiresAdditionalSupport',
          'Confirm whether they require additional support',
        )
      })
    })

    describe('when _hasPhyHealthNeeds_ is YES', () => {
      const page = new PhysicalHealth({ hasPhyHealthNeeds: 'yes' }, application)

      describe('and _needsDetail_ is UNANSWERED', () => {
        it('includes a validation error for _needsDetail_', () => {
          expect(page.errors()).toHaveProperty('needsDetail', 'Describe physical health needs')
        })
      })

      describe('and _canClimbStairs_ is UNANSWERED', () => {
        it('includes a validation error for _canClimbStairs_', () => {
          expect(page.errors()).toHaveProperty('canClimbStairs', 'Confirm whether they can climb stairs')
        })
      })
    })

    describe('when _isReceivingMedicationOrTreatment_ is YES', () => {
      const page = new PhysicalHealth({ isReceivingMedicationOrTreatment: 'yes' }, application)

      describe('and _medicationOrTreatmentDetail_ is UNANSWERED', () => {
        it('includes a validation error for _medicationOrTreatmentDetail_', () => {
          expect(page.errors()).toHaveProperty('medicationOrTreatmentDetail', 'Describe the medication or treatment')
        })
      })
    })

    describe('when _canLiveIndependently_ is NO', () => {
      const page = new PhysicalHealth({ canLiveIndependently: 'no' }, application)

      describe('and _indyLivingDetail_ is UNANSWERED', () => {
        it('includes a validation error for _indyLivingDetail_', () => {
          expect(page.errors()).toHaveProperty('indyLivingDetail', 'Describe why they are unable to live independently')
        })
      })
    })

    describe('when _requiresAdditionalSupport_ is YES', () => {
      const page = new PhysicalHealth({ requiresAdditionalSupport: 'yes' }, application)

      describe('and _addSupportDetail_ is UNANSWERED', () => {
        it('includes a validation error for _addSupportDetail_', () => {
          expect(page.errors()).toHaveProperty('addSupportDetail', 'Describe the support required')
        })
      })
    })
  })

  describe('onSave', () => {
    it('removes physical needs data if the question is set to "no"', () => {
      const body: Partial<PhysicalHealthBody> = {
        hasPhyHealthNeeds: 'no',
        needsDetail: 'Needs detail',
        canClimbStairs: 'yes',
      }

      const page = new PhysicalHealth(body, application)

      page.onSave()

      expect(page.body).toEqual({
        hasPhyHealthNeeds: 'no',
      })
    })

    it('removes medication and treatment data if the question is set to "no"', () => {
      const body: Partial<PhysicalHealthBody> = {
        isReceivingMedicationOrTreatment: 'no',
        medicationOrTreatmentDetail: 'Treatment detail',
      }

      const page = new PhysicalHealth(body, application)

      page.onSave()

      expect(page.body).toEqual({
        isReceivingMedicationOrTreatment: 'no',
      })
    })

    it('removes independent living data if the question is set to "yes"', () => {
      const body: Partial<PhysicalHealthBody> = {
        canLiveIndependently: 'yes',
        indyLivingDetail: 'Independent living detail',
      }

      const page = new PhysicalHealth(body, application)

      page.onSave()

      expect(page.body).toEqual({
        canLiveIndependently: 'yes',
      })
    })

    it('removes additional support data if the question is set to "no"', () => {
      const body: Partial<PhysicalHealthBody> = {
        requiresAdditionalSupport: 'no',
        addSupportDetail: 'Additional support detail',
      }

      const page = new PhysicalHealth(body, application)

      page.onSave()

      expect(page.body).toEqual({
        requiresAdditionalSupport: 'no',
      })
    })
  })
})
