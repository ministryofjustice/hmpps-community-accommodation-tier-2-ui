import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import OtherBackground, { OtherBackgroundBody } from './otherBackground'

describe('OtherBackground', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new OtherBackground({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new OtherBackground({}, application), 'religion')
  itShouldHavePreviousValue(new OtherBackground({}, application), 'ethnic-group')

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new OtherBackground({ otherBackground: 'arab' }, application)
      const optionalExample = 'example'

      expect(page.items(optionalExample)).toEqual([
        {
          checked: true,
          text: 'Arab',
          value: 'arab',
        },
        {
          checked: false,
          conditional: {
            html: 'example',
          },
          text: 'Any other ethnic group',
          value: 'other',
        },
        {
          divider: 'or',
        },
        {
          checked: false,
          text: 'Prefer not to say',
          value: 'preferNotToSay',
        },
      ])
    })
  })

  describe('errors', () => {
    it('should return errors when the questions are blank', () => {
      const page = new OtherBackground({}, application)

      expect(page.errors()).toEqual({
        otherBackground: "Select a background or 'Prefer not to say'",
      })
    })

    it('should not return an error when the optional question is missing', () => {
      const page = new OtherBackground({ otherBackground: 'other', optionalOtherBackground: undefined }, application)

      expect(page.errors()).toEqual({})
    })
  })

  describe('onSave', () => {
    it('removes background data if question is not set to "other"', () => {
      const body: Partial<OtherBackgroundBody> = {
        otherBackground: 'preferNotToSay',
        optionalOtherBackground: 'Other background',
      }

      const page = new OtherBackground(body, application)

      page.onSave()

      expect(page.body).toEqual({
        otherBackground: 'preferNotToSay',
      })
    })
  })
})
