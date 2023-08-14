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
    it('not implemented', () => {
      const page = new MentalHealth({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new MentalHealth({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
