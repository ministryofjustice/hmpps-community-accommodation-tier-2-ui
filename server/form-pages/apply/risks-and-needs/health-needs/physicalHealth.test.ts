import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import PhysicalHealth from './physicalHealth'

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
        expect(page.questions.hasPhyHealthNeeds.needsDetail.question).toBeDefined()
        expect(page.questions.hasPhyHealthNeeds.canClimbStairs.question).toBeDefined()
      })
    })

    describe('isReceivingTreatment', () => {
      it('has a question', () => {
        expect(page.questions.isReceivingTreatment.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.isReceivingTreatment.treatmentDetail.question).toBeDefined()
      })
    })

    describe('hasPhyHealthMedication', () => {
      it('has a question', () => {
        expect(page.questions.hasPhyHealthMedication.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.hasPhyHealthMedication.medicationDetail.question).toBeDefined()
      })
    })

    describe('canLiveIndependently', () => {
      it('has a question', () => {
        expect(page.questions.canLiveIndependently.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.canLiveIndependently.indyLivingDetail.question).toBeDefined()
      })
    })

    describe('requiresAdditionalSupport', () => {
      it('has a question', () => {
        expect(page.questions.requiresAdditionalSupport.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.requiresAdditionalSupport.addSupportDetail.question).toBeDefined()
      })
    })
  })

  describe('response', () => {
    it('not implemented', () => {
      const page = new PhysicalHealth({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new PhysicalHealth({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
