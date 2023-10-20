import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import Guidance from './guidance'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('Guidance', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new Guidance({}, application)

      expect(page.title).toEqual('Request health information for Roger Smith')
    })
  })

  itShouldHaveNextValue(new Guidance({}, application), 'substance-misuse')
  itShouldHavePreviousValue(new Guidance({}, application), 'taskList')

  describe('errors', () => {
    it('returns no errors as this guidance page has no questions/answers', () => {
      const page = new Guidance({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
