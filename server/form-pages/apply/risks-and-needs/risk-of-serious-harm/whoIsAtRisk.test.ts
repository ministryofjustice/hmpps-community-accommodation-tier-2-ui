import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import WhoIsAtRisk from './whoIsAtRisk'

describe('whoIsAtRisk', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new WhoIsAtRisk({}, application)

      expect(page.title).toEqual(`People at risk from Roger Smith`)
    })
  })

  describe('import date', () => {
    it('sets importDate to null where application contains no OASys import date', () => {
      const page = new WhoIsAtRisk({}, application)

      expect(page.importDate).toEqual(null)
    })
  })

  itShouldHaveNextValue(new WhoIsAtRisk({}, application), 'nature-of-the-risk')
  itShouldHavePreviousValue(new WhoIsAtRisk({}, application), 'summary')

  describe('errors', () => {
    it('returns an error when required fields are blank', () => {
      const page = new WhoIsAtRisk({}, application)
      expect(page.errors()).toEqual({
        confirmation: 'Confirm that the information is relevant and up to date',
        whoIsAtRisk: 'Enter who is at risk',
      })
    })
  })

  describe('items', () => {
    it('returns the checkbox as expected', () => {
      const page = new WhoIsAtRisk({}, application)

      expect(page.items()).toEqual([
        { value: 'confirmed', text: 'I confirm this information is relevant and up to date.', checked: false },
      ])
    })
  })
})
