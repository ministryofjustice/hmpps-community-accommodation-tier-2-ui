import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import OldOasys from './oldOasys'

describe('OldOasys', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new OldOasys({}, application)

      expect(page.title).toEqual(`Does Roger Smith have an older OASys with risk of serious harm (RoSH) information?`)
    })
  })

  itShouldHaveNextValue(new OldOasys({}, application), 'risk-to-others')
  itShouldHavePreviousValue(new OldOasys({}, application), 'taskList')

  describe('errors', () => {
    it('returns an error when required fields are blank', () => {
      const page = new OldOasys({}, application)
      expect(page.errors()).toEqual({
        hasOldOasys: 'Confirm whether they have an older OASys with risk of serious harm (RoSH) information',
      })
    })
    it('returns an error when hasOldOasys is yes but oasysCompletedDate is blank', () => {
      const page = new OldOasys({ hasOldOasys: 'yes' }, application)
      expect(page.errors()).toEqual({
        oasysCompletedDate: 'Enter the date the OASys was completed',
      })
    })
  })

  describe('response', () => {
    it('returns the full response when all fields are entered', () => {
      const page = new OldOasys(
        {
          hasOldOasys: 'yes',
          'oasysCompletedDate-year': '2023',
          'oasysCompletedDate-month': '11',
          'oasysCompletedDate-day': '11',
        },
        application,
      )

      const expected = {
        'Does Roger Smith have an older OASys with risk of serious harm (RoSH) information?': 'Yes',
        'When was the OASys completed?': '11 November 2023',
      }
      expect(page.response()).toEqual(expected)
    })
  })

  it('ignores the date field when there is no old OASys', () => {
    const page = new OldOasys(
      {
        hasOldOasys: 'no',
      },
      application,
    )

    const expected = {
      'Does Roger Smith have an older OASys with risk of serious harm (RoSH) information?':
        'No, they do not have an OASys',
    }
    expect(page.response()).toEqual(expected)
  })
})
