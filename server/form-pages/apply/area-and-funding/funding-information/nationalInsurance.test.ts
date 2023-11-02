import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { applicationFactory } from '../../../../testutils/factories/index'
import NationalInsurance from './nationalInsurance'

describe('NationalInsurance', () => {
  const applicationWithPersonalSavings = applicationFactory.build({
    data: {
      'funding-information': {
        'funding-source': {
          fundingSource: 'personalSavings',
        },
      },
    },
  })

  const applicationWithAlternativeID = applicationFactory.build({
    data: {
      'funding-information': {
        identification: {
          idDocuments: 'none',
        },
      },
    },
  })

  const application = applicationFactory.build({})

  itShouldHaveNextValue(new NationalInsurance({}, applicationWithPersonalSavings), '')
  itShouldHavePreviousValue(new NationalInsurance({}, applicationWithPersonalSavings), 'funding-source')
  itShouldHavePreviousValue(new NationalInsurance({}, applicationWithAlternativeID), 'alternative-identification')
  itShouldHavePreviousValue(new NationalInsurance({}, application), 'identification')

  describe('errors', () => {
    it('not implemented', () => {
      const page = new NationalInsurance({}, applicationWithPersonalSavings)

      expect(page.errors()).toEqual({})
    })
  })
})
