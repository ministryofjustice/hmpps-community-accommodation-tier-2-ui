import { itShouldHavePreviousValue, itShouldHaveNextValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import HDCLicenceDates from './hdcLicenceDates'
import { dateAndTimeInputsAreValidDates, dateIsTodayOrInTheFuture } from '../../../../utils/dateUtils'

jest.mock('../../../../utils/dateUtils', () => {
  const actual = jest.requireActual('../../../../utils/dateUtils')
  return {
    ...actual,
    dateAndTimeInputsAreValidDates: jest.fn(),
    dateIsTodayOrInTheFuture: jest.fn(),
  }
})

describe('HDCLicenceDates', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new HDCLicenceDates({}, application)

      expect(page.title).toEqual("Roger Smith's Home Detention Curfew (HDC) licence dates")
    })
  })

  itShouldHavePreviousValue(new HDCLicenceDates({}, application), 'taskList')
  itShouldHaveNextValue(new HDCLicenceDates({}, application), '')

  describe('errors', () => {
    describe('when the dates given are not valid', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        ;(dateAndTimeInputsAreValidDates as jest.Mock).mockImplementation(() => false)
        ;(dateIsTodayOrInTheFuture as jest.Mock).mockImplementation(() => true)
      })

      it('returns errors', () => {
        const page = new HDCLicenceDates({}, application)
        expect(page.errors()).toEqual({
          hdcEligibilityDate: "Enter the applicant's HDC eligibility date",
          conditionalReleaseDate: "Enter the applicant's conditional release date",
        })
      })
    })

    describe('when the conditional release date (CRD) is in the past', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        ;(dateAndTimeInputsAreValidDates as jest.Mock).mockImplementation(() => true)
        ;(dateIsTodayOrInTheFuture as jest.Mock).mockImplementation(() => false)
      })

      it('returns errors', () => {
        const page = new HDCLicenceDates({}, application)
        expect(page.errors()).toEqual({
          conditionalReleaseDate: 'Conditional release date cannot be in the past',
        })
      })
    })
  })

  describe('response', () => {
    it('returns data in expected format', () => {
      const page = new HDCLicenceDates(
        {
          'hdcEligibilityDate-year': '2023',
          'hdcEligibilityDate-month': '11',
          'hdcEligibilityDate-day': '11',
          'conditionalReleaseDate-year': '2023',
          'conditionalReleaseDate-month': '11',
          'conditionalReleaseDate-day': '12',
        },
        application,
      )

      expect(page.response()).toEqual({
        'HDC eligibility date': '11 November 2023',
        'Conditional release date': '12 November 2023',
      })
    })
  })
})
