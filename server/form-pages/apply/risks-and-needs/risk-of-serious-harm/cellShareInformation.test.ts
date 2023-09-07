import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import CellShareInformation from './cellShareInformation'

describe('CellShareInformation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new CellShareInformation({}, application)

      expect(page.title).toEqual(`Cell share information for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new CellShareInformation({}, application), '')
  itShouldHavePreviousValue(new CellShareInformation({}, application), 'risk-management-arrangements')

  describe('response', () => {
    it('not implemented', () => {
      const page = new CellShareInformation({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new CellShareInformation({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
