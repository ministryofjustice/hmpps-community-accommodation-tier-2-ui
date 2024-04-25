import { itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import HDCLicenceDates from './hdcLicenceDates'
import {
  dateAndTimeInputsAreValidDates,
  dateIsTodayOrInTheFuture,
  isBeforeDate,
  isMoreThanMonthsBetweenDates,
  differenceInDaysFromToday,
  dateIsComplete,
} from '../../../../utils/dateUtils'

jest.mock('../../../../utils/dateUtils', () => {
  const actual = jest.requireActual('../../../../utils/dateUtils')
  return {
    ...actual,
    dateAndTimeInputsAreValidDates: jest.fn(),
    dateIsTodayOrInTheFuture: jest.fn(),
    isMoreThanMonthsBetweenDates: jest.fn(),
    isBeforeDate: jest.fn(),
    differenceInDaysFromToday: jest.fn(),
    dateIsComplete: jest.fn(),
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

  describe('next', () => {
    it('returns an empty string', () => {
      ;(differenceInDaysFromToday as jest.Mock).mockImplementation(() => 25)

      const page = new HDCLicenceDates({}, application)
      expect(page.next()).toEqual('')
    })

    describe('when the current date is within 20 days of the CRD', () => {
      it("returns 'hdc-warning'", () => {
        ;(differenceInDaysFromToday as jest.Mock).mockImplementation(() => 20)

        const page = new HDCLicenceDates({}, application)
        expect(page.next()).toEqual('hdc-warning')
      })
    })

    describe('when the current date is within 10 days of the CRD', () => {
      it("returns 'hdc-ineligible'", () => {
        ;(differenceInDaysFromToday as jest.Mock).mockImplementation(() => 10)

        const page = new HDCLicenceDates({}, application)
        expect(page.next()).toEqual('hdc-ineligible')
      })
    })
  })

  describe('errors', () => {
    describe('when no dates are provided', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        ;(dateIsComplete as jest.Mock).mockImplementation(() => false)
      })

      it('returns errors', () => {
        const page = new HDCLicenceDates({}, application)
        expect(page.errors()).toEqual({
          hdcEligibilityDate: "Enter the applicant's HDC eligibility date",
          conditionalReleaseDate: "Enter the applicant's conditional release date",
        })
      })
    })

    describe('when false dates are provided', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        ;(dateIsComplete as jest.Mock).mockImplementation(() => true)
        ;(dateAndTimeInputsAreValidDates as jest.Mock).mockImplementation(() => false)
      })

      it('returns errors', () => {
        const page = new HDCLicenceDates({}, application)
        expect(page.errors()).toEqual({
          hdcEligibilityDate: 'Eligibility date must be a real date',
          conditionalReleaseDate: 'Conditional release date must be a real date',
        })
      })
    })

    describe('when the conditional release date (CRD) is in the past', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        ;(dateIsComplete as jest.Mock).mockImplementation(() => true)
        ;(dateAndTimeInputsAreValidDates as jest.Mock).mockImplementation(() => true)
        ;(dateIsTodayOrInTheFuture as jest.Mock).mockImplementation(() => false)
        ;(isMoreThanMonthsBetweenDates as jest.Mock).mockImplementation(() => false)
        ;(isBeforeDate as jest.Mock).mockImplementation(() => true)
      })

      it('returns errors', () => {
        const page = new HDCLicenceDates({}, application)
        expect(page.errors()).toEqual({
          conditionalReleaseDate: 'Conditional release date cannot be in the past',
        })
      })
    })

    describe('when the HDC date is more than 6 months before the CRD date', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        ;(dateIsComplete as jest.Mock).mockImplementation(() => true)
        ;(dateAndTimeInputsAreValidDates as jest.Mock).mockImplementation(() => true)
        ;(dateIsTodayOrInTheFuture as jest.Mock).mockImplementation(() => true)
        ;(isMoreThanMonthsBetweenDates as jest.Mock).mockImplementation(() => true)
        ;(isBeforeDate as jest.Mock).mockImplementation(() => true)
      })

      it('returns errors', () => {
        const page = new HDCLicenceDates({}, application)
        expect(page.errors()).toEqual({
          hdcEligibilityDate: 'HDC eligibility date cannot be more than 6 months before the conditional release date',
        })
      })
    })

    describe('when the HDC date is after the CRD date', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        ;(dateIsComplete as jest.Mock).mockImplementation(() => true)
        ;(dateAndTimeInputsAreValidDates as jest.Mock).mockImplementation(() => true)
        ;(dateIsTodayOrInTheFuture as jest.Mock).mockImplementation(() => true)
        ;(isMoreThanMonthsBetweenDates as jest.Mock).mockImplementation(() => false)
        ;(isBeforeDate as jest.Mock).mockImplementation(() => false)
      })

      it('returns errors', () => {
        const page = new HDCLicenceDates({}, application)
        expect(page.errors()).toEqual({
          hdcEligibilityDate: 'HDC eligibility date must be before the conditional release date',
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
