import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import MentalHealth from './mentalHealth'

describe('MentalHealth', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new MentalHealth({}, application)

      expect(page.title).toEqual('Mental health needs for Roger Smith')
    })
  })

  describe('Questions', () => {
    const page = new MentalHealth({}, application)

    describe('hasMentalHealthNeeds', () => {
      it('has a question', () => {
        expect(page.questions.hasMentalHealthNeeds.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.hasMentalHealthNeeds.needsDetail.question).toBeDefined()
      })
    })

    describe('isEngagedWithCommunity', () => {
      it('has a question', () => {
        expect(page.questions.isEngagedWithCommunity.question).toBeDefined()
      })
      it('has one follow-up question', () => {
        expect(page.questions.isEngagedWithCommunity.servicesDetail.question).toBeDefined()
      })
    })

    describe('hasPrescribedMedication', () => {
      it('has a question', () => {
        expect(page.questions.hasPrescribedMedication.question).toBeDefined()
      })
      it('has 3 follow-up questions', () => {
        expect(page.questions.hasPrescribedMedication.isInPossessionOfMeds.question).toBeDefined()
        expect(page.questions.hasPrescribedMedication.medicationDetail.question).toBeDefined()
        expect(page.questions.hasPrescribedMedication.medicationIssues.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new MentalHealth({}, application), 'communication-and-language')
  itShouldHavePreviousValue(new MentalHealth({}, application), 'physical-health')

  describe('response', () => {
    it('returns the correct plain english responses for the questions', () => {
      const page = new MentalHealth(
        {
          hasMentalHealthNeeds: 'yes',
          needsDetail: 'Has depression',
          isEngagedWithCommunity: 'yes',
          servicesDetail: 'Attending The Well Clinic',
          hasPrescribedMedication: 'yes',
          isInPossessionOfMeds: 'no',
          medicationDetail: 'anti-epilepsy',
          medicationIssues: 'often forget to take it',
        },
        application,
      )

      expect(page.response()).toEqual({
        'Do they have any mental health needs?': 'Yes',
        'Please describe their mental health needs.': 'Has depression',
        'Are they engaged with any community mental health services?': 'Yes',
        'Please state which services.': 'Attending The Well Clinic',
        'Are they prescribed any medication for their mental health?': 'Yes',
        'Are they in possession of their medication?': 'No',
        'Please list any medications.': 'anti-epilepsy',
        'Please list any issues they have with taking their medication': 'often forget to take it',
      })
    })
  })

  describe('errors', () => {
    describe('when top-level questions are unanswered', () => {
      const page = new MentalHealth({}, application)

      it('includes a validation error for _hasMentalHealthNeeds_', () => {
        expect(page.errors()).toHaveProperty('hasMentalHealthNeeds', 'Confirm whether they have mental health needs')
      })

      it('includes a validation error for _isEngagedWithCommunity_', () => {
        expect(page.errors()).toHaveProperty('isEngagedWithCommunity', 'Confirm whether they are engaged with services')
      })

      it('includes a validation error for _hasPrescribedMedication_', () => {
        expect(page.errors()).toHaveProperty(
          'hasPrescribedMedication',
          'Confirm whether they are prescribed medication',
        )
      })
    })
  })
})
