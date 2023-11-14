import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import EqualityAndDiversity from './willAnswer'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('EqualityAndDiversity', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('question', () => {
    it('personalises the question', () => {
      const page = new EqualityAndDiversity({ willAnswer: 'yes' }, application)

      expect(page.questions).toEqual({
        willAnswer: 'Equality questions for Roger Smith',
      })
    })
  })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new EqualityAndDiversity({ willAnswer: 'yes' }, application)

      expect(page.title).toEqual('Equality questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new EqualityAndDiversity({ willAnswer: 'no' }, application), '')
  itShouldHaveNextValue(new EqualityAndDiversity({ willAnswer: 'yes' }, application), 'disability')
  itShouldHavePreviousValue(new EqualityAndDiversity({ willAnswer: 'yes' }, application), 'taskList')

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new EqualityAndDiversity({ willAnswer: 'yes' }, application)

      expect(page.items()).toEqual([
        {
          value: 'yes',
          text: 'Yes, answer the equality questions (takes 2 minutes)',
          checked: true,
        },
        {
          value: 'no',
          text: 'No, skip the equality questions',
          checked: false,
        },
      ])
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
