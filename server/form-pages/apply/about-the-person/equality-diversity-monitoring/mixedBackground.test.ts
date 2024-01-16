import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import MixedBackground, { MixedBackgroundBody } from './mixedBackground'

describe('MixedBackground', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new MixedBackground({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new MixedBackground({}, application), 'religion')
  itShouldHavePreviousValue(new MixedBackground({}, application), 'ethnic-group')

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new MixedBackground({ mixedBackground: 'whiteAndBlackAfrican' }, application)
      const optionalExample = 'example'

      expect(page.items(optionalExample)).toEqual([
        {
          checked: false,
          text: 'White and Black Caribbean',
          value: 'whiteAndBlackCaribbean',
        },
        {
          checked: true,
          text: 'White and Black African',
          value: 'whiteAndBlackAfrican',
        },
        {
          checked: false,
          text: 'White and Asian',
          value: 'whiteAndAsian',
        },
        {
          checked: false,
          conditional: {
            html: 'example',
          },
          text: 'Any other mixed or multiple ethnic background',
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
      const page = new MixedBackground({}, application)

      expect(page.errors()).toEqual({
        mixedBackground: "Select a background or 'Prefer not to say'",
      })
    })

    it('should not return an error when the optional question is missing', () => {
      const page = new MixedBackground({ mixedBackground: 'other', optionalMixedBackground: undefined }, application)

      expect(page.errors()).toEqual({})
    })
  })

  describe('onSave', () => {
    it('removes mixed background data when the question is not set to "other"', () => {
      const body: Partial<MixedBackgroundBody> = {
        mixedBackground: 'preferNotToSay',
        optionalMixedBackground: 'Mixed background',
      }

      const page = new MixedBackground(body, application)

      page.onSave()

      expect(page.body).toEqual({
        mixedBackground: 'preferNotToSay',
      })
    })
  })
})
