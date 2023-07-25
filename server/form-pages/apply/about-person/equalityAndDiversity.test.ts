import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../shared-examples'
import EqualityAndDiversity from './equalityAndDiversity'
import { personFactory, applicationFactory } from '../../../testutils/factories/index'

describe('EqualityAndDiversity', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('question', () => {
    it('personalises the question', () => {
      const page = new EqualityAndDiversity({ willAnswer: 'yes' }, application)

      expect(page.questions).toEqual({
        willAnswer: 'Does Roger Smith want to answer the equality questions?',
      })
    })
  })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new EqualityAndDiversity({ willAnswer: 'yes' }, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new EqualityAndDiversity({ willAnswer: 'yes' }, application), '')
  itShouldHavePreviousValue(new EqualityAndDiversity({ willAnswer: 'yes' }, application), 'taskList')

  describe('response', () => {
    it('Adds selected option to page response', () => {
      const page = new EqualityAndDiversity({ willAnswer: 'yes' }, application)

      expect(page.response()).toEqual({
        'Does Roger Smith want to answer the equality questions?': 'yes',
      })
    })

    it('Deletes fields where there is not an answer', () => {
      const page = new EqualityAndDiversity({ willAnswer: undefined }, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('should return errors when yes/no questions are blank', () => {
      const page = new EqualityAndDiversity({}, application)

      expect(page.errors()).toEqual({
        willAnswer: 'Choose either Yes or No',
      })
    })
  })
})
