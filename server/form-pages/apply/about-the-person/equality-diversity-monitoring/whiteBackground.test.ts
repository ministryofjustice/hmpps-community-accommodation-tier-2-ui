import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import WhiteBackground from './whiteBackground'

describe('WhiteBackground', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new WhiteBackground({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new WhiteBackground({}, application), '')
  itShouldHavePreviousValue(new WhiteBackground({}, application), 'ethnic-group')

  describe('response', () => {
    it('Adds selected option to page response in _translated_ form', () => {
      const page = new WhiteBackground({ whiteBackground: 'english' }, application)

      expect(page.response()).toEqual({
        "Which of the following best describes Roger Smith's White background?":
          'English, Welsh, Scottish, Northern Irish or British',
      })
    })

    it('Adds optional background data to page response in _translated_ form', () => {
      const page = new WhiteBackground({ whiteBackground: 'other', optionalWhiteBackground: 'example' }, application)

      expect(page.response()).toEqual({
        "Which of the following best describes Roger Smith's White background?": 'Any other White background',
        'How would they describe their background? (optional)': 'example',
      })
    })

    it('Deletes fields where there is not an answer', () => {
      const page = new WhiteBackground({ whiteBackground: undefined, optionalWhiteBackground: undefined }, application)

      expect(page.response()).toEqual({})
    })
  })

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
})
