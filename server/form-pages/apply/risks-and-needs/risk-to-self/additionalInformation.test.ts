import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import AdditionalInformation from './additionalInformation'

describe('AdditionalInformation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new AdditionalInformation({}, application)

      expect(page.title).toEqual('Additional Information')
    })
  })

  describe('Questions', () => {
    const page = new AdditionalInformation({}, application)

    describe('additionalInformationDetail', () => {
      it('has a question', () => {
        expect(page.questions.additionalInformationDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new AdditionalInformation({}, application), '')
  itShouldHavePreviousValue(new AdditionalInformation({}, application), 'acct')

  describe('response', () => {
    it('returns the correct plain english responses for the questions', () => {
      const page = new AdditionalInformation(
        {
          additionalInformationDetail: 'is at risk',
        },
        application,
      )

      expect(page.response()).toEqual({
        "Is there anything else to include about Roger Smith's risk to self? (Optional)": 'is at risk',
      })
    })
  })

  describe('errors', () => {
    it('returns empty object', () => {
      const page = new AdditionalInformation({}, application)
      expect(page.errors()).toEqual({})
    })
  })
})
