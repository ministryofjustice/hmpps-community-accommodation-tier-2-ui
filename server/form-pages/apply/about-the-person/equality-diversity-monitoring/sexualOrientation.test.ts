import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import SexualOrientation from './sexualOrientation'

describe('SexualOrientation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new SexualOrientation({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new SexualOrientation({}, application), 'ethnic-group')
  itShouldHavePreviousValue(new SexualOrientation({}, application), 'sex-and-gender')

  describe('response', () => {
    it('Adds selected option to page response in _translated_ form', () => {
      const page = new SexualOrientation({ orientation: 'gay' }, application)

      expect(page.response()).toEqual({
        "Which of the following best describes Roger Smith's sexual orientation?": 'Gay',
        'How would they describe their sexual orientation? (optional)': undefined,
      })
    })

    it('Adds optional gender data to page response in _translated_ form', () => {
      const page = new SexualOrientation({ orientation: 'other', otherOrientation: 'example' }, application)

      expect(page.response()).toEqual({
        "Which of the following best describes Roger Smith's sexual orientation?": 'Other',
        'How would they describe their sexual orientation? (optional)': 'example',
      })
    })

    it('Deletes fields where there is not an answer', () => {
      const page = new SexualOrientation({ orientation: undefined, otherOrientation: undefined }, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new SexualOrientation({ orientation: 'gay' }, application)
      const conditional = 'example'
      expect(page.items(conditional)).toEqual([
        {
          checked: false,
          text: 'Heterosexual or straight',
          value: 'heterosexual',
        },
        {
          text: 'Gay',
          value: 'gay',
          checked: true,
        },
        {
          text: 'Lesbian',
          value: 'lesbian',
          checked: false,
        },
        {
          checked: false,
          text: 'Bisexual',
          value: 'bisexual',
        },
        {
          checked: false,
          conditional: {
            html: 'example',
          },
          text: 'Other',
          value: 'other',
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
      const page = new SexualOrientation({}, application)

      expect(page.errors()).toEqual({
        orientation: 'Select an orientation, or choose Prefer not to say',
      })
    })

    it('should not return an error when the optional question is missing', () => {
      const page = new SexualOrientation({ orientation: 'other' }, application)

      expect(page.errors()).toEqual({})
    })
  })
})
