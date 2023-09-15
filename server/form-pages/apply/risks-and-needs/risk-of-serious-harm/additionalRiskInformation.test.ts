import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import AdditionalRiskInformation from './additionalRiskInformation'

describe('AdditionalRiskInformation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new AdditionalRiskInformation({}, application)

      expect(page.title).toEqual(`Additional risk information for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new AdditionalRiskInformation({}, application), '')
  itShouldHavePreviousValue(new AdditionalRiskInformation({}, application), 'behaviour-notes')

  describe('response', () => {
    it('returns the correct plain english responses for the questions', () => {
      const page = new AdditionalRiskInformation(
        {
          hasAdditionalInformation: 'yes',
          additionalInformationDetail: 'is at risk',
        },
        application,
      )

      expect(page.response()).toEqual({
        'Is there any other risk information for Roger Smith?': 'yes',
        'Additional information': 'is at risk',
      })
    })
  })

  describe('errors', () => {
    describe('when answer data is valid', () => {
      it('returns empty object if valid data', () => {
        const page = new AdditionalRiskInformation({ hasAdditionalInformation: 'no' }, application)
        expect(page.errors()).toEqual({})
      })
    })

    describe('when they have not answered the has additional information question', () => {
      it('returns an error', () => {
        const page = new AdditionalRiskInformation({}, application)
        expect(page.errors()).toEqual({
          hasAdditionalInformation: 'Select whether there is any additional risk information',
        })
      })
    })

    describe('when they have answered Yes there is additional information but not provided any', () => {
      it('returns an error', () => {
        const page = new AdditionalRiskInformation({ hasAdditionalInformation: 'yes' }, application)
        expect(page.errors()).toEqual({
          additionalInformationDetail: 'Enter additional information for risk to others',
        })
      })
    })
  })
})
