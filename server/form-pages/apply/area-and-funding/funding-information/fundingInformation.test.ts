import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import FundingInformation from './fundingInformation'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('FundingInformation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('sets the question title as the page title', () => {
      const page = new FundingInformation({ fundingSource: 'personalSavings' }, application)

      expect(page.questions).toEqual({
        fundingSource: 'How will Roger Smith pay for their accommodation and service charge?',
      })
    })
  })

  it('should set the body', () => {
    const page = new FundingInformation(
      {
        fundingSource: 'personalSavings',
      },
      application,
    )

    expect(page.body).toEqual({
      fundingSource: 'personalSavings',
    })
  })

  describe('items', () => {
    it('returns the items as expected', () => {
      const page = new FundingInformation({ fundingSource: 'personalSavings' }, application)

      expect(page.items()).toEqual([
        { checked: true, text: 'Personal money or savings', value: 'personalSavings' },
        {
          checked: false,
          text: 'Benefits',
          value: 'benefits',
          hint: {
            text: 'This includes Housing Benefit and Universal Credit, Disability Living Allowance, and Employment and Support Allowance',
          },
        },
        { divider: 'or' },
        {
          value: 'both',
          text: 'Both',
          checked: false,
        },
      ])
    })
  })

  itShouldHaveNextValue(new FundingInformation({ fundingSource: 'personalSavings' }, application), 'national-insurance')
  itShouldHaveNextValue(new FundingInformation({ fundingSource: 'benefits' }, application), 'identification')
  itShouldHavePreviousValue(new FundingInformation({ fundingSource: 'personalSavings' }, application), 'taskList')

  describe('errors', () => {
    it('should return errors when yes/no questions are blank', () => {
      const page = new FundingInformation({}, application)

      expect(page.errors()).toEqual({
        fundingSource: 'Select a funding source',
      })
    })
  })
})
