import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import BrainInjury from './brainInjury'

describe('BrainInjury', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new BrainInjury({}, application)

      expect(page.title).toEqual('Brain injury needs for Roger Smith')
    })
  })

  itShouldHaveNextValue(new BrainInjury({}, application), 'other-health')
  itShouldHavePreviousValue(new BrainInjury({}, application), 'learning-difficulties')

  describe('response', () => {
    it('not implemented', () => {
      const page = new BrainInjury({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new BrainInjury({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
