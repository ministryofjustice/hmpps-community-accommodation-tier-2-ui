import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import Religion, { ReligionBody } from './religion'

describe('Religion', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new Religion({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  itShouldHaveNextValue(new Religion({}, application), 'military-veteran')
  itShouldHavePreviousValue(
    new Religion(
      {},
      { ...application, data: { 'equality-and-diversity-monitoring': { 'ethnic-group': { ethnicGroup: 'white' } } } },
    ),
    'white-background',
  )
  itShouldHavePreviousValue(
    new Religion(
      {},
      { ...application, data: { 'equality-and-diversity-monitoring': { 'ethnic-group': { ethnicGroup: 'asian' } } } },
    ),
    'asian-background',
  )
  itShouldHavePreviousValue(
    new Religion(
      {},
      {
        ...application,
        data: { 'equality-and-diversity-monitoring': { 'ethnic-group': { ethnicGroup: 'preferNotToSay' } } },
      },
    ),
    'ethnic-group',
  )

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

  describe('onSave', () => {
    it('removes religion data when the question is not set to "other"', () => {
      const body: Partial<ReligionBody> = {
        religion: 'preferNotToSay',
        otherReligion: 'Other religion',
      }

      const page = new Religion(body, application)

      page.onSave()

      expect(page.body).toEqual({
        religion: 'preferNotToSay',
      })
    })
  })
})
