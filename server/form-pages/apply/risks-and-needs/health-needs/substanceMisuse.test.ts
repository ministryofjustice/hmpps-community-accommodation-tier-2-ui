import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import SubstanceMisuse from './substanceMisuse'

describe('SubstanceMisuse', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new SubstanceMisuse({}, application)

      expect(page.title).toEqual('Health needs for Roger Smith')
    })
  })

  itShouldHaveNextValue(new SubstanceMisuse({}, application), '')
  itShouldHavePreviousValue(new SubstanceMisuse({}, application), 'taskList')

  describe('response', () => {
    it('not implemented', () => {
      const page = new SubstanceMisuse({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new SubstanceMisuse({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
