import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import NatureOfTheRisk from './natureOfTheRisk'

describe('NatureOfTheRisk', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new NatureOfTheRisk({}, application)

      expect(page.title).toEqual(`Nature of the risk from Roger Smith`)
    })
  })

  describe('import date', () => {
    it('sets importDate to null where application contains no OASys import date', () => {
      const page = new NatureOfTheRisk({}, application)

      expect(page.importDate).toEqual(null)
    })
  })

  itShouldHaveNextValue(new NatureOfTheRisk({}, application), 'risk-management-arrangements')
  itShouldHavePreviousValue(new NatureOfTheRisk({}, application), 'who-is-at-risk')

  describe('errors', () => {
    it('returns an error when required fields are blank', () => {
      const page = new NatureOfTheRisk({}, application)
      expect(page.errors()).toEqual({
        confirmation: 'Confirm that the information is relevant and up to date',
        natureOfRisk: 'Enter the nature of the risk',
      })
    })
  })

  describe('items', () => {
    it('returns the checkbox as expected', () => {
      const page = new NatureOfTheRisk({}, application)

      expect(page.items()).toEqual([
        { value: 'confirmed', text: 'I confirm this information is relevant and up to date.', checked: false },
      ])
    })
  })
})
