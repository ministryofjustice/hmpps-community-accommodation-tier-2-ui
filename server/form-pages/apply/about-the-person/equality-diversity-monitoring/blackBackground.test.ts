import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import BlackBackground, { BlackBackgroundBody } from './blackBackground'

describe('BlackBackground', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new BlackBackground({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new BlackBackground({}, application), 'religion')
  itShouldHavePreviousValue(new BlackBackground({}, application), 'ethnic-group')

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

  describe('onSave', () => {
    it('removes black background data when the question is not set to "other"', () => {
      const body: Partial<BlackBackgroundBody> = {
        blackBackground: 'preferNotToSay',
        optionalBlackBackground: 'Black background',
      }

      const page = new BlackBackground(body, application)

      page.onSave()

      expect(page.body).toEqual({
        blackBackground: 'preferNotToSay',
      })
    })
  })
})
