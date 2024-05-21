import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import OldOasys from './oldOasys'
import { dateAndTimeInputsAreValidDates, dateIsComplete } from '../../../../utils/dateUtils'

jest.mock('../../../../utils/dateUtils', () => {
  const actual = jest.requireActual('../../../../utils/dateUtils')
  return {
    ...actual,
    dateAndTimeInputsAreValidDates: jest.fn(),
    dateIsComplete: jest.fn(),
  }
})

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
    describe('when hasOldOasys is yes', () => {
      it('returns an error when oasysCompletedDate is blank', () => {
        const page = new OldOasys({ hasOldOasys: 'yes' }, application)
        expect(page.errors()).toEqual({
          oasysCompletedDate: 'Enter the date the OASys was completed',
        })
      })

      describe('when the date is not valid', () => {
        beforeEach(() => {
          jest.resetAllMocks()
          ;(dateAndTimeInputsAreValidDates as jest.Mock).mockImplementation(() => false)
          ;(dateIsComplete as jest.Mock).mockImplementation(() => true)
        })
        it('returns an error', () => {
          const page = new OldOasys({ hasOldOasys: 'yes' }, application)
          expect(page.errors()).toEqual({
            oasysCompletedDate: 'OASys completed date must be a real date',
          })
        })
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
