import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import ContactNumber from './contactNumber'
import { applicationFactory, personFactory } from '../../../../testutils/factories/index'

describe('ContactNumber', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  itShouldHaveNextValue(new ContactNumber({}, application), '')
  itShouldHavePreviousValue(new ContactNumber({}, application), 'job-title')

  describe('errors', () => {
    it('returns an error if contact number is missing', () => {
      const page = new ContactNumber({}, application)

      expect(page.errors()).toEqual({ telephone: 'Enter your contact telephone number' })
    })
  })
})
