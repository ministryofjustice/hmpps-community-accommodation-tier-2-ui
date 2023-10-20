import { itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import EthnicGroup, { EthnicGroupBody } from './ethnicGroup'

describe('EthnicGroup', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new EthnicGroup({}, application)

      expect(page.title).toEqual('Equality and diversity questions for Roger Smith')
    })
  })

  describe('next', () => {
    const backgroundPages = [
      [undefined, 'religion'],
      ['preferNotToSay', 'religion'],
      ['white', 'white-background'],
      ['mixed', 'mixed-background'],
      ['asian', 'asian-background'],
      ['black', 'black-background'],
      ['other', 'other-background'],
    ]

    it.each(backgroundPages)('it returns the right next page based on answer', (answer, pageName) => {
      const page = new EthnicGroup({ ethnicGroup: answer } as EthnicGroupBody, application)
      expect(page.next()).toEqual(pageName)
    })
  })

  itShouldHavePreviousValue(new EthnicGroup({}, application), 'sexual-orientation')

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new EthnicGroup({ ethnicGroup: 'white' }, application)
      expect(page.items()).toEqual([
        {
          checked: true,
          text: 'White',
          value: 'white',
        },
        {
          checked: false,
          text: 'Mixed or multiple ethnic groups',
          value: 'mixed',
        },
        {
          checked: false,
          text: 'Asian or Asian British',
          value: 'asian',
        },
        {
          checked: false,
          text: 'Black, African, Caribbean or Black British',
          value: 'black',
        },
        {
          checked: false,
          text: 'Other ethnic group',
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
      const page = new EthnicGroup({}, application)

      expect(page.errors()).toEqual({
        ethnicGroup: "Select an ethnic group or choose 'Prefer not to say'",
      })
    })
  })
})
