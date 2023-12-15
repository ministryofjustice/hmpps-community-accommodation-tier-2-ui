import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import JobTitle from './jobTitle'
import { applicationFactory, personFactory } from '../../../../testutils/factories/index'

describe('JobTitle', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  itShouldHaveNextValue(new JobTitle({}, application), 'contact-number')
  itShouldHavePreviousValue(new JobTitle({}, application), 'confirm-details')

  describe('errors', () => {
    it('returns an error if job title is missing', () => {
      const page = new JobTitle({}, application)

      expect(page.errors()).toEqual({ jobTitle: 'Enter your job title' })
    })
  })
})
