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
    it('not implemented', () => {
      const page = new AdditionalRiskInformation({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new AdditionalRiskInformation({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
