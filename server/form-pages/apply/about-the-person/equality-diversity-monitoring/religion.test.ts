import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import Religion from './religion'

describe('Religion', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new Religion({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new Religion({}, application), '')
  itShouldHavePreviousValue(new Religion({}, application), 'ethnic-group')

  describe('response', () => {
    it('Adds selected option to page response in _translated_ form', () => {
      const page = new Religion({ religion: 'atheist' }, application)

      expect(page.response()).toEqual({
        "What is Roger Smith's religion?": 'Atheist or Humanist',
        'What is their religion? (optional)': undefined,
      })
    })

    it('Adds optional gender data to page response in _translated_ form', () => {
      const page = new Religion({ religion: 'other', otherReligion: 'example' }, application)

      expect(page.response()).toEqual({
        "What is Roger Smith's religion?": 'Any other religion',
        'What is their religion? (optional)': 'example',
      })
    })

    it('Deletes fields where there is not an answer', () => {
      const page = new Religion({ religion: undefined, otherReligion: undefined }, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new Religion({ religion: 'agnostic' }, application)
      const conditional = 'example'
      expect(page.items(conditional)).toEqual([
        {
          checked: false,
          text: 'No religion',
          value: 'noReligion',
        },
        {
          checked: false,
          text: 'Atheist or Humanist',
          value: 'atheist',
        },
        {
          checked: true,
          text: 'Agnostic',
          value: 'agnostic',
        },
        {
          checked: false,
          text: 'Christian',
          value: 'christian',
          hint: {
            text: 'Including Church of England, Catholic, Protestant and all other Christian denominations.',
          },
        },
        {
          checked: false,
          text: 'Buddhist',
          value: 'buddhist',
        },
        {
          checked: false,
          text: 'Hindu',
          value: 'hindu',
        },
        {
          checked: false,
          text: 'Jewish',
          value: 'jewish',
        },
        {
          checked: false,
          text: 'Muslim',
          value: 'muslim',
        },
        {
          checked: false,
          text: 'Sikh',
          value: 'sikh',
        },
        {
          checked: false,
          conditional: {
            html: 'example',
          },
          text: 'Any other religion',
          value: 'other',
        },
        { divider: 'or' },
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
      const page = new Religion({}, application)

      expect(page.errors()).toEqual({
        religion: "Select a religion or 'Prefer not to say'",
      })
    })

    it('should not return an error when the optional question is missing', () => {
      const page = new Religion({ religion: 'other' }, application)

      expect(page.errors()).toEqual({})
    })
  })
})
