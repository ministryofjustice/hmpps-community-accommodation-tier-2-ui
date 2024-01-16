import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import SexAndGender, { SexAndGenderBody } from './sexAndGender'

describe('SexAndGender', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new SexAndGender({ sex: 'female' }, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new SexAndGender({ sex: 'female' }, application), 'sexual-orientation')
  itShouldHavePreviousValue(new SexAndGender({}, application), 'disability')

  describe('sexItems', () => {
    it('returns the radio with the expected label text', () => {
      const page = new SexAndGender({ sex: 'female' }, application)

      expect(page.sexItems()).toEqual([
        {
          value: 'female',
          text: 'Female',
          checked: true,
        },
        {
          value: 'male',
          text: 'Male',
          checked: false,
        },
        {
          value: 'preferNotToSay',
          text: 'Prefer not to say',
          checked: false,
        },
      ])
    })
  })

  describe('genderItems', () => {
    it('returns the radio with the expected label text', () => {
      const page = new SexAndGender({ gender: 'yes' }, application)
      const optionalGenderIdentity = 'example'

      expect(page.genderItems(optionalGenderIdentity)).toEqual([
        {
          value: 'yes',
          text: 'Yes',
          checked: true,
        },
        {
          value: 'no',
          text: 'No',
          checked: false,
          conditional: {
            html: 'example',
          },
        },
        {
          value: 'preferNotToSay',
          text: 'Prefer not to say',
          checked: false,
        },
      ])
    })
  })

  describe('errors', () => {
    it('should return errors when the questions are blank', () => {
      const page = new SexAndGender({}, application)

      expect(page.errors()).toEqual({
        sex: 'Choose either Female, Male or Prefer not to say',
        gender: 'Choose either Yes, No or Prefer not to say',
      })
    })

    it('should not return an error when the optional question is missing', () => {
      const page = new SexAndGender({ sex: 'female', gender: 'no' }, application)

      expect(page.errors()).toEqual({})
    })
  })

  describe('onSave', () => {
    it('removes gender identity data when the question is not set to "no"', () => {
      const body: Partial<SexAndGenderBody> = {
        gender: 'preferNotToSay',
        optionalGenderIdentity: 'Gender identity',
      }

      const page = new SexAndGender(body, application)

      page.onSave()

      expect(page.body).toEqual({
        gender: 'preferNotToSay',
      })
    })
  })
})
