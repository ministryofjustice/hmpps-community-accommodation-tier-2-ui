import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import BlackBackground from './blackBackground'

describe('BlackBackground', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new BlackBackground({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new BlackBackground({}, application), '')
  itShouldHavePreviousValue(new BlackBackground({}, application), 'ethnic-group')

  describe('response', () => {
    it('Adds selected option to page response in _translated_ form', () => {
      const page = new BlackBackground({ blackBackground: 'caribbean' }, application)

      expect(page.response()).toEqual({
        "Which of the following best describes Roger Smith's Black, African, Caribbean or Black British background?":
          'Caribbean',
        'How would they describe their background? (optional)': undefined,
      })
    })

    it('Adds optional background data to page response in _translated_ form', () => {
      const page = new BlackBackground({ blackBackground: 'other', optionalBlackBackground: 'example' }, application)

      expect(page.response()).toEqual({
        "Which of the following best describes Roger Smith's Black, African, Caribbean or Black British background?":
          'Any other Black, African or Caribbean background',
        'How would they describe their background? (optional)': 'example',
      })
    })

    it('Deletes fields where there is not an answer', () => {
      const page = new BlackBackground({ blackBackground: undefined, optionalBlackBackground: undefined }, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new BlackBackground({ blackBackground: 'african' }, application)
      const optionalExample = 'example'

      expect(page.items(optionalExample)).toEqual([
        {
          checked: true,
          text: 'African',
          value: 'african',
        },
        {
          checked: false,
          text: 'Caribbean',
          value: 'caribbean',
        },
        {
          checked: false,
          conditional: {
            html: 'example',
          },
          text: 'Any other Black, African or Caribbean background',
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
      const page = new BlackBackground({}, application)

      expect(page.errors()).toEqual({
        blackBackground: "Select a background or 'Prefer not to say'",
      })
    })

    it('should not return an error when the optional question is missing', () => {
      const page = new BlackBackground({ blackBackground: 'other', optionalBlackBackground: undefined }, application)

      expect(page.errors()).toEqual({})
    })
  })
})
