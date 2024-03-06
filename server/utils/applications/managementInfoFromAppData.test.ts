import {
  preferredAreasFromAppData,
  hdcEligibilityDateFromAppData,
  conditionalReleaseDateFromAppData,
  telephoneNumberFromAppData,
} from './managementInfoFromAppData'

import { applicationFactory } from '../../testutils/factories'

describe('managementInfoFromAppData', () => {
  describe('preferredAreasFromAppData', () => {
    it('concatenates the first and second choices into a pipe-delimited string', () => {
      const application = applicationFactory.build({
        data: {
          'area-information': {
            'first-preferred-area': { preferredArea: 'Bradford' },
            'second-preferred-area': { preferredArea: 'Leeds' },
          },
        },
      })
      expect(preferredAreasFromAppData(application)).toEqual('Bradford | Leeds')
    })

    const noAreasData = [
      {
        'area-information': null,
      },
      {
        'area-information': {
          'first-preferred-area': null,
          'second-preferred-area': null,
        },
      },
      {
        'area-information': {
          'first-preferred-area': { preferredArea: '' },
          'second-preferred-area': { preferredArea: '' },
        },
      },
      {},
      null,
    ]

    it.each(noAreasData)('returns an empty string when no areas are specified', data => {
      const application = applicationFactory.build({
        data,
      })
      expect(preferredAreasFromAppData(application)).toEqual('')
    })

    it('does not include a pipe when only one area is specified', () => {
      const application = applicationFactory.build({
        data: {
          'area-information': {
            'first-preferred-area': { preferredArea: 'Bradford' },
            'second-preferred-area': { preferredArea: '' },
          },
        },
      })
      expect(preferredAreasFromAppData(application)).toEqual('Bradford')
    })
  })

  describe('hdcEligibilityDateFromAppData', () => {
    it('returns the given date', () => {
      const application = applicationFactory.build({
        data: {
          'hdc-licence-dates': {
            'hdc-licence-dates': { hdcEligibilityDate: '2024-02-27' },
          },
        },
      })
      expect(hdcEligibilityDateFromAppData(application)).toEqual('2024-02-27')
    })

    const noDateData = [
      {
        'hdc-licence-dates': null,
      },
      {
        'hdc-licence-dates': { 'hdc-licence-dates': null },
      },
      {},
      null,
    ]

    it.each(noDateData)('returns null if no date is given', data => {
      const application = applicationFactory.build({
        data,
      })
      expect(hdcEligibilityDateFromAppData(application)).toEqual(null)
    })
  })

  describe('conditionalReleaseDateFromAppData', () => {
    it('returns the given date', () => {
      const application = applicationFactory.build({
        data: {
          'hdc-licence-dates': {
            'hdc-licence-dates': { conditionalReleaseDate: '2024-03-15' },
          },
        },
      })
      expect(conditionalReleaseDateFromAppData(application)).toEqual('2024-03-15')
    })

    const noDateData = [
      {
        'hdc-licence-dates': null,
      },
      {
        'hdc-licence-dates': { 'hdc-licence-dates': null },
      },
      {},
      null,
    ]

    it.each(noDateData)('returns null if no date is given', data => {
      const application = applicationFactory.build({
        data,
      })
      expect(conditionalReleaseDateFromAppData(application)).toEqual(null)
    })
  })

  describe('telephoneNumberFromAppData', () => {
    it('returns the given contact number', () => {
      const application = applicationFactory.build({
        data: {
          'referrer-details': {
            'contact-number': { telephone: '0800 123' },
          },
        },
      })
      expect(telephoneNumberFromAppData(application)).toEqual('0800 123')
    })

    const noDateData = [
      {
        'referrer-details': null,
      },
      {
        'referrer-details': { 'contact-number': null },
      },
      {},
      null,
    ]

    it.each(noDateData)('returns null if no contact number is given', data => {
      const application = applicationFactory.build({
        data,
      })
      expect(telephoneNumberFromAppData(application)).toEqual(null)
    })
  })
})
