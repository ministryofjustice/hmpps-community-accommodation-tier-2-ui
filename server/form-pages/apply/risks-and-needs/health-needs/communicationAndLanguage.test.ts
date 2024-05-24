import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import CommunicationAndLanguage, { CommunicationAndLanguageBody } from './communicationAndLanguage'

describe('CommunicationAndLanguage', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new CommunicationAndLanguage({}, application)

      expect(page.title).toEqual('Communication and language needs for Roger Smith')
    })
  })

  describe('questions', () => {
    const page = new CommunicationAndLanguage({}, application)

    describe('requiresInterpreter', () => {
      it('has a question', () => {
        expect(page.questions.requiresInterpreter.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.interpretationDetail.question).toBeDefined()
      })
    })

    describe('hasSupportNeeds', () => {
      it('has a question', () => {
        expect(page.questions.hasSupportNeeds.question).toBeDefined()
      })
      it('has a follow-up question', () => {
        expect(page.questions.supportDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new CommunicationAndLanguage({}, application), 'learning-difficulties')
  itShouldHavePreviousValue(new CommunicationAndLanguage({}, application), 'mental-health')

  describe('errors', () => {
    describe('when top-level questions are unanswered', () => {
      const page = new CommunicationAndLanguage({}, application)

      it('includes a validation error for _requiresInterpreter_', () => {
        expect(page.errors()).toHaveProperty('requiresInterpreter', 'Confirm whether they need an interpreter')
      })

      it('includes a validation error for _hasSupportNeeds_', () => {
        expect(page.errors()).toHaveProperty('hasSupportNeeds', 'Confirm they they need support')
      })
    })

    describe('when _requiresInterpreter_ is YES', () => {
      const page = new CommunicationAndLanguage({ requiresInterpreter: 'yes' }, application)

      describe('and _interpretationDetail_ is UNANSWERED', () => {
        it('includes a validation error for _interpretationDetail_', () => {
          expect(page.errors()).toHaveProperty(
            'interpretationDetail',
            'Specify the language the interpreter is needed for',
          )
        })
      })
    })

    describe('when _hasSupportNeeds_ is YES', () => {
      const page = new CommunicationAndLanguage({ hasSupportNeeds: 'yes' }, application)

      describe('and _supportDetail_ is UNANSWERED', () => {
        it('includes a validation error for _supportDetail_', () => {
          expect(page.errors()).toHaveProperty(
            'supportDetail',
            'Describe the support needed to see, hear, speak or understand',
          )
        })
      })
    })
  })

  describe('onSave', () => {
    it('removes interpreter data when the question is set to "no"', () => {
      const body: Partial<CommunicationAndLanguageBody> = {
        requiresInterpreter: 'no',
        interpretationDetail: 'Interpretation detail',
      }

      const page = new CommunicationAndLanguage(body, application)

      page.onSave()

      expect(page.body).toEqual({
        requiresInterpreter: 'no',
      })
    })

    it('removes support needs data when the question is set to "no"', () => {
      const body: Partial<CommunicationAndLanguageBody> = {
        hasSupportNeeds: 'no',
        supportDetail: 'Support detail',
      }

      const page = new CommunicationAndLanguage(body, application)

      page.onSave()

      expect(page.body).toEqual({
        hasSupportNeeds: 'no',
      })
    })
  })
})
