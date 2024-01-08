import { preferredAreasFromAppData, hdcEligibilityDateFromAppData } from './managementInfoFromAppData'

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

    it('returns an empty string when no areas are specified', () => {
      const application = applicationFactory.build({
        data: {
          'area-information': {
            'first-preferred-area': { preferredArea: '' },
            'second-preferred-area': { preferredArea: '' },
          },
        },
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
          'hdc-licence-and-cpp-details': {
            'hdc-licence-dates': { hdcEligibilityDate: '2024-02-27' },
          },
        },
      })
      expect(hdcEligibilityDateFromAppData(application)).toEqual('2024-02-27')
    })

    it('returns null if no date is given', () => {
      const application = applicationFactory.build({
        data: {
          'hdc-licence-and-cpp-details': null,
        },
      })
      expect(hdcEligibilityDateFromAppData(application)).toEqual(null)
    })
  })
})
