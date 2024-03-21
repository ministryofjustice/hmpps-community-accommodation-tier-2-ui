import { itShouldHavePreviousValue, itShouldHaveNextValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import HDCIneligible from './hdcIneligible'

describe('HDCIneligible', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('returns the page title', () => {
      const page = new HDCIneligible({}, application)

      expect(page.title).toEqual('It is too late to submit a CAS-2 application')
    })
  })

  itShouldHavePreviousValue(new HDCIneligible({}, application), 'hdc-licence-dates')
  itShouldHaveNextValue(new HDCIneligible({}, application), '')

  describe('errors', () => {
    it('returns no errors as this page has no questions/answers', () => {
      const page = new HDCIneligible({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
