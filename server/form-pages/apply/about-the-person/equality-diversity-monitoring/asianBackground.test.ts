import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import AsianBackground, { AsianBackgroundBody } from './asianBackground'

describe('AsianBackground', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new AsianBackground({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new AsianBackground({}, application), 'religion')
  itShouldHavePreviousValue(new AsianBackground({}, application), 'ethnic-group')

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new AsianBackground({ asianBackground: 'chinese' }, application)
      const optionalExample = 'example'

      expect(page.items(optionalExample)).toEqual([
        {
          checked: false,
          text: 'Indian',
          value: 'indian',
        },
        {
          checked: false,
          text: 'Pakistani',
          value: 'pakistani',
        },
        {
          checked: true,
          text: 'Chinese',
          value: 'chinese',
        },
        {
          checked: false,
          text: 'Bangladeshi',
          value: 'bangladeshi',
        },
        {
          checked: false,
          conditional: {
            html: 'example',
          },
          text: 'Any other Asian background',
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
      const page = new AsianBackground({}, application)

      expect(page.errors()).toEqual({
        asianBackground: "Select a background or 'Prefer not to say'",
      })
    })

    it('should not return an error when the optional question is missing', () => {
      const page = new AsianBackground({ asianBackground: 'other', optionalAsianBackground: undefined }, application)

      expect(page.errors()).toEqual({})
    })
  })

  describe('onSave', () => {
    it('removes asian background data when the question is not set to "other"', () => {
      const body: Partial<AsianBackgroundBody> = {
        asianBackground: 'preferNotToSay',
        optionalAsianBackground: 'Asian background',
      }

      const page = new AsianBackground(body, application)

      page.onSave()

      expect(page.body).toEqual({
        asianBackground: 'preferNotToSay',
      })
    })
  })
})
