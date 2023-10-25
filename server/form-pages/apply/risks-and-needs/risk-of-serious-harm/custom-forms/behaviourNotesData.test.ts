import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../../testutils/factories/index'
import BehaviourNotesData from './behaviourNotesData'

describe('BehaviourNotesData', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  const behaviourNotesData = [
    {
      behaviourDetail: 'detail info',
    },
  ]

  describe('title', () => {
    it('has a page title', () => {
      const page = new BehaviourNotesData({}, application)

      expect(page.title).toEqual('Add a behaviour note for Roger Smith')
    })
  })

  itShouldHaveNextValue(new BehaviourNotesData({}, application), 'behaviour-notes')
  itShouldHavePreviousValue(new BehaviourNotesData({}, application), 'behaviour-notes')

  describe('errors', () => {
    describe('when there are no errors', () => {
      it('returns empty object', () => {
        const page = new BehaviourNotesData(behaviourNotesData[0], application)
        expect(page.errors()).toEqual({})
      })
    })

    it('it includes a validation error for the behaviour field', () => {
      const page = new BehaviourNotesData({}, application)
      const errors = page.errors()

      expect(errors.behaviourDetail).toEqual("Describe the applicant's behaviour")
    })
  })

  describe('response', () => {
    it('returns empty object', () => {
      const page = new BehaviourNotesData({}, application)
      expect(page.response()).toEqual({})
    })
  })
})
