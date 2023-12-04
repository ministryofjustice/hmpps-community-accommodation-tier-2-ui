import { YesOrNo } from '@approved-premises/ui'
import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import FamilyAccommodation from './familyAccommodation'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('FamilyAccommodation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Sue Smith' }) })
  const body = {
    familyProperty: 'yes' as YesOrNo,
  }

  it('sets the question as the page title', () => {
    const page = new FamilyAccommodation(body, application)

    expect(page.title).toEqual('Family accommodation for Sue Smith')
  })

  it('sets the body', () => {
    const page = new FamilyAccommodation(body, application)

    expect(page.body).toEqual(body)
  })

  describe('errors', () => {
    it('returns an error if familyProperty is not set', () => {
      const page = new FamilyAccommodation({ familyProperty: null }, application)

      expect(page.errors()).toEqual({
        familyProperty: 'Select yes if they want to apply to live with their children in a family property',
      })
    })
  })

  itShouldHaveNextValue(new FamilyAccommodation(body, application), '')
  itShouldHavePreviousValue(new FamilyAccommodation(body, application), 'gang-affiliations')
})
