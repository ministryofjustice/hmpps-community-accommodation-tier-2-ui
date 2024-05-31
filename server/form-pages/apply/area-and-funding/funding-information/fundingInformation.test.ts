import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import FundingInformation, { FundingSources } from './fundingInformation'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('FundingInformation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('sets the title', () => {
      const page = new FundingInformation({ fundingSource: 'personalSavings' }, application)

      expect(page.title).toEqual('Funding information for Roger Smith')
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

    it('should return an error when the answer is both', () => {
      const page = new FundingInformation(
        {
          fundingSource: 'both' as FundingSources,
        },
        application,
      )

      expect(page.errors()).toEqual({
        fundingSource: 'Select a funding source',
      })
    })
  })
})
