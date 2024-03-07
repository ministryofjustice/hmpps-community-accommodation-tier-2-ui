import { Cas2Application } from '@approved-premises/api'
import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import PreviousAddress, { PreviousAddressBody } from './previousAddress'

describe('PreviousAddress', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  const previousAddress = {
    hasPreviousAddress: 'yes',
    previousAddressLine1: '1 Example Road',
    previousAddressLine2: 'Pretend Close',
    previousTownOrCity: 'Aberdeen',
    previousCounty: 'Gloucestershire',
    previousPostcode: 'AB1 2CD',
  } as PreviousAddressBody

  const lastKnownAddress = {
    hasPreviousAddress: 'no',
    howLong: '6 months',
    lastKnownAddressLine1: '2 Example Road',
    lastKnownAddressLine2: '2 Pretend Close',
    lastKnownTownOrCity: 'Bristol',
    lastKnownCounty: 'Shropshire',
    lastKnownPostcode: 'EF1 GHD',
  } as PreviousAddressBody

  const noLastKnownAddress = {
    hasPreviousAddress: 'no',
  } as PreviousAddressBody

  describe('title', () => {
    it('has a page title', () => {
      const page = new PreviousAddress({}, application)

      expect(page.title).toEqual('Did Roger Smith have a previous address before entering custody?')
    })
  })

  itShouldHaveNextValue(new PreviousAddress({}, application), '')
  itShouldHavePreviousValue(new PreviousAddress({}, application), 'taskList')

  describe('errors', () => {
    describe('when the previous address question has not been answered', () => {
      it('it includes returns an error', () => {
        const page = new PreviousAddress({}, application)
        const errors = page.errors()

        expect(errors.hasPreviousAddress).toEqual('Select whether applicant had an address before entering custody')
      })
    })
    describe('when there is a previous address', () => {
      describe('when there are no errors', () => {
        it('returns empty object', () => {
          const page = new PreviousAddress(previousAddress, application)
          expect(page.errors()).toEqual({})
        })
      })
      const requiredFields = [
        ['previousAddressLine1', 'Enter the first line of the address'],
        ['previousTownOrCity', 'Enter a town or city'],
        ['previousPostcode', 'Enter a postcode'],
      ]

      it.each(requiredFields)('it includes a validation error for %s', (field, message) => {
        const page = new PreviousAddress({ hasPreviousAddress: 'yes' }, application)
        const errors = page.errors()

        expect(errors[field]).toEqual(message)
      })
    })

    describe('when there is not a previous address', () => {
      it('includes a validation error for howLong field', () => {
        const page = new PreviousAddress(noLastKnownAddress, application)
        expect(page.errors()).toEqual({ howLong: 'Enter how long the person has had no fixed address' })
      })
    })
  })

  describe('response', () => {
    it('returns empty object', () => {
      const applicationWithNoData = { ...application, data: undefined } as Cas2Application
      const page = new PreviousAddress({}, applicationWithNoData)
      expect(page.response()).toEqual({})
    })

    describe('when there is a previous address', () => {
      const applicationWithData = {
        ...application,
        data: { 'address-history': { 'previous-address': { ...previousAddress } } },
      }
      const page = new PreviousAddress({}, applicationWithData)
      expect(page.response()).toEqual({
        'Did Roger Smith have an address before entering custody?': 'Yes',
        'What was the address?': `1 Example Road\r\nPretend Close\r\nAberdeen\r\nGloucestershire\r\nAB1 2CD\r\n`,
      })
    })

    describe('when there is no previous address, but there is a last known address', () => {
      const applicationWithData = {
        ...application,
        data: { 'address-history': { 'previous-address': { ...lastKnownAddress } } },
      }
      const page = new PreviousAddress({}, applicationWithData)
      expect(page.response()).toEqual({
        'Did Roger Smith have an address before entering custody?': 'No fixed address',
        'How long did the applicant have no fixed address for?': '6 months',
        'What was their last known address? (Optional)': `2 Example Road\r\n2 Pretend Close\r\nBristol\r\nShropshire\r\nEF1 GHD\r\n`,
      })
    })

    describe('when there is no previous address or last known address', () => {
      const applicationWithData = {
        ...application,
        data: { 'address-history': { 'previous-address': { ...noLastKnownAddress, howLong: '6 months' } } },
      }
      const page = new PreviousAddress({}, applicationWithData)
      expect(page.response()).toEqual({
        'Did Roger Smith have an address before entering custody?': 'No fixed address',
        'How long did the applicant have no fixed address for?': '6 months',
        'What was their last known address? (Optional)': 'Not applicable',
      })
    })

    describe('when there is no previous address and a partial last known address', () => {
      const applicationWithData = {
        ...application,
        data: {
          'address-history': {
            'previous-address': {
              hasPreviousAddress: 'no',
              howLong: '6 months',
              lastKnownCounty: 'Shropshire',
              lastKnownPostcode: 'EF1 GHD',
            },
          },
        },
      }
      const page = new PreviousAddress({}, applicationWithData)
      expect(page.response()).toEqual({
        'Did Roger Smith have an address before entering custody?': 'No fixed address',
        'How long did the applicant have no fixed address for?': '6 months',
        'What was their last known address? (Optional)': `Shropshire\r\nEF1 GHD\r\n`,
      })
    })
  })

  describe('items', () => {
    it('returns the checkboxs as expected', () => {
      const page = new PreviousAddress({}, application)

      const knownAddressHtml = 'known address'
      const lastKnownHtml = 'last known'

      expect(page.items(knownAddressHtml, lastKnownHtml)).toEqual([
        { value: 'yes', text: 'Yes', checked: false, conditional: { html: knownAddressHtml } },
        { value: 'no', text: 'No fixed address', checked: false, conditional: { html: lastKnownHtml } },
      ])
    })
  })
})
