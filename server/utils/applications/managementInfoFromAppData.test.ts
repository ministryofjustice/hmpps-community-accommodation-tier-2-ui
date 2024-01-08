import { preferredAreasFromAppData } from './managementInfoFromAppData'

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
})
