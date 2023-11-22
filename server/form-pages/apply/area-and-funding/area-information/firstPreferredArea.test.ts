import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import FirstPreferredArea from './firstPreferredArea'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('FirstPreferredArea', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Sue Smith' }) })
  const body = {
    preferredArea: 'London',
    preferenceReason: 'They have family in the area',
  }

  it('sets the question as the page title', () => {
    const page = new FirstPreferredArea(body, application)

    expect(page.title).toEqual('First preferred area for Sue Smith')
  })

  it('sets the body', () => {
    const page = new FirstPreferredArea(body, application)

    expect(page.body).toEqual(body)
  })

  describe('errors', () => {
    it('returns an error if preferredArea is not set', () => {
      const page = new FirstPreferredArea({ ...body, preferredArea: null }, application)

      expect(page.errors()).toEqual({
        preferredArea: 'Provide a town, city or region for the first preferred area',
      })
    })

    it('returns an error if preferenceReason is not set', () => {
      const page = new FirstPreferredArea({ ...body, preferenceReason: null }, application)

      expect(page.errors()).toEqual({
        preferenceReason: "Provide the reason for the applicant's first preferred area",
      })
    })
  })

  itShouldHaveNextValue(new FirstPreferredArea(body, application), 'second-preferred-area')
  itShouldHavePreviousValue(new FirstPreferredArea(body, application), 'taskList')
})
