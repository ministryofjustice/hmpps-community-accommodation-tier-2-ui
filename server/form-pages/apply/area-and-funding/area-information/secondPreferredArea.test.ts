import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import SecondPreferredArea from './secondPreferredArea'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('SecondPreferredArea', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Sue Smith' }) })
  const body = {
    preferredArea: 'London',
    preferenceReason: 'They have family in the area',
  }

  it('sets the question as the page title', () => {
    const page = new SecondPreferredArea(body, application)

    expect(page.title).toEqual('Second preferred area for Sue Smith')
  })

  it('sets the body', () => {
    const page = new SecondPreferredArea(body, application)

    expect(page.body).toEqual(body)
  })

  describe('errors', () => {
    it('returns an error if preferredArea is not set', () => {
      const page = new SecondPreferredArea({ ...body, preferredArea: null }, application)

      expect(page.errors()).toEqual({
        preferredArea: 'Provide a town, city or region for the second preferred area',
      })
    })

    it('returns an error if preferenceReason is not set', () => {
      const page = new SecondPreferredArea({ ...body, preferenceReason: null }, application)

      expect(page.errors()).toEqual({
        preferenceReason: "Provide the reason for the applicant's second preferred area",
      })
    })
  })

  itShouldHaveNextValue(new SecondPreferredArea(body, application), 'exclusion-zones')
  itShouldHavePreviousValue(new SecondPreferredArea(body, application), 'first-preferred-area')
})
