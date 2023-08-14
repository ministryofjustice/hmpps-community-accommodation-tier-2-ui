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
    it('returns the correct plain english responses for the questions', () => {
      const page = new PhysicalHealth(
        {
          hasPhyHealthNeeds: 'yes',
          needsDetail: 'Has reduced mobility',
          canClimbStairs: 'yes',
          isReceivingTreatment: 'yes',
          treatmentDetail: 'Receives physiotherapy',
          hasPhyHealthMedication: 'yes',
          medicationDetail: 'Oral anti-inflammatories',
          canLiveIndependently: 'no',
          indyLivingDetail: 'Requires assistance with bathing',
          requiresAdditionalSupport: 'yes',
          addSupportDetail: 'Needs help with cooking and nutrition',
        },
        application,
      )

      expect(page.response()).toEqual({
        'Do they have any physical health needs?': 'Yes',
        'Please describe their needs.': 'Has reduced mobility',
        'Can they climb stairs?': 'Yes',
        'Are they currently receiving any medical treatment for their physical health needs?': 'Yes',
        'Please describe their treatment.': 'Receives physiotherapy',
        'Are they currently receiving any medication for their physical health needs?': 'Yes',
        'Please describe their medication.': 'Oral anti-inflammatories',
        'Can they live independently?': 'No',
        "Please describe why they can't.": 'Requires assistance with bathing',
        'Do they require any additional support?': 'Yes',
        'Please describe the types of support.': 'Needs help with cooking and nutrition',
      })
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new PhysicalHealth({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
