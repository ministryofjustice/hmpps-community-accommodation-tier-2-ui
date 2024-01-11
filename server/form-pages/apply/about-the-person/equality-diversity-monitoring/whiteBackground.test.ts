import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import WhiteBackground, { WhiteBackgroundBody } from './whiteBackground'

describe('WhiteBackground', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new WhiteBackground({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new WhiteBackground({}, application), 'religion')
  itShouldHavePreviousValue(new WhiteBackground({}, application), 'ethnic-group')

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new WhiteBackground({ whiteBackground: 'english' }, application)
      const optionalExample = 'example'

      expect(page.items(optionalExample)).toEqual([
        {
          checked: true,
          text: 'English, Welsh, Scottish, Northern Irish or British',
          value: 'english',
        },
        {
          checked: false,
          text: 'Irish',
          value: 'irish',
        },
        {
          checked: false,
          text: 'Gypsy or Irish Traveller',
          value: 'gypsy',
        },
        {
          checked: false,
          conditional: {
            html: 'example',
          },
          text: 'Any other White background',
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
      const page = new WhiteBackground({}, application)

      expect(page.errors()).toEqual({
        whiteBackground: "Select a background or 'Prefer not to say'",
      })
    })

    it('should not return an error when the optional question is missing', () => {
      const page = new WhiteBackground({ whiteBackground: 'other', optionalWhiteBackground: undefined }, application)

      expect(page.errors()).toEqual({})
    })
  })

  describe('onSave', () => {
    it('removes white background data when the question is not set to "other"', () => {
      const body: Partial<WhiteBackgroundBody> = {
        whiteBackground: 'preferNotToSay',
        optionalWhiteBackground: 'White background',
      }

      const page = new WhiteBackground(body, application)

      page.onSave()

      expect(page.body).toEqual({
        whiteBackground: 'preferNotToSay',
      })
    })
  })
})
