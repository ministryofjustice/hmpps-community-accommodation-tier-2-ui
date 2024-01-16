import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import AdditionalInformation, { AdditionalInformationBody } from './additionalInformation'

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

  describe('errors', () => {
    describe('when they have not provided any answer', () => {
      it('returns an error', () => {
        const page = new AdditionalInformation({}, application)
        expect(page.errors()).toEqual({ hasAdditionalInformation: 'Confirm whether you have additional information' })
      })
    })

    describe('when there is no additional data', () => {
      it('does not return errors', () => {
        const page = new AdditionalInformation({ hasAdditionalInformation: 'no' }, application)
        expect(page.errors()).toEqual({})
      })
    })

    describe('when they have answered Yes there is additional information but not provided any', () => {
      it('returns additional information error', () => {
        const page = new AdditionalInformation({ hasAdditionalInformation: 'yes' }, application)
        expect(page.errors()).toEqual({
          additionalInformationDetail: 'Provide additional information about their risk to self',
        })
      })
    })
  })

  describe('onSave', () => {
    it('removes additional information data if question is set to "no"', () => {
      const body: AdditionalInformationBody = {
        hasAdditionalInformation: 'no',
        additionalInformationDetail: 'Additional information detail',
      }

      const page = new AdditionalInformation(body, application)

      page.onSave()

      expect(page.body).toEqual({
        hasAdditionalInformation: 'no',
      })
    })
  })
})
