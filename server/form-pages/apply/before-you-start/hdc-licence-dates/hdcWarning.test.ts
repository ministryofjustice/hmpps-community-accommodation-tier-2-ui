import { itShouldHavePreviousValue, itShouldHaveNextValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import HDCWarning from './hdcWarning'

describe('HDCWarning', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('returns the page title', () => {
      const page = new HDCWarning({}, application)

      expect(page.title).toEqual('It may be too late to offer this applicant a CAS-2 placement')
    })
  })

  itShouldHavePreviousValue(new HDCWarning({}, application), 'hdc-licence-dates')
  itShouldHaveNextValue(new HDCWarning({}, application), '')

  describe('errors', () => {
    it('returns no errors as this page has no questions/answers', () => {
      const page = new HDCWarning({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
