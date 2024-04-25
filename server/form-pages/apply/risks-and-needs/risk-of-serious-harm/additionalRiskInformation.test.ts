import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import AdditionalRiskInformation, { AdditionalRiskInformationBody } from './additionalRiskInformation'

describe('AdditionalRiskInformation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new AdditionalRiskInformation({}, application)

      expect(page.title).toEqual(`Additional risk information for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new AdditionalRiskInformation({}, application), '')
  itShouldHavePreviousValue(new AdditionalRiskInformation({}, application), 'cell-share-information')

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

  describe('onSave', () => {
    it('removes additional information data when the question is set to "no"', () => {
      const body: AdditionalRiskInformationBody = {
        hasAdditionalInformation: 'no',
        additionalInformationDetail: 'Additional information',
      }

      const page = new AdditionalRiskInformation(body, application)

      page.onSave()

      expect(page.body).toEqual({
        hasAdditionalInformation: 'no',
      })
    })
  })
})
