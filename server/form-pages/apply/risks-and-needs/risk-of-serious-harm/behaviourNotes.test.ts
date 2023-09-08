import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import BehaviourNotes from './behaviourNotes'

describe('BehaviourNotes', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new BehaviourNotes({}, application)

      expect(page.title).toEqual(`Behaviour notes for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new BehaviourNotes({}, application), 'additional-risk-information')
  itShouldHavePreviousValue(new BehaviourNotes({}, application), 'cell-share-information')

  describe('response', () => {
    it('not implemented', () => {
      const page = new BehaviourNotes({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new BehaviourNotes({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
