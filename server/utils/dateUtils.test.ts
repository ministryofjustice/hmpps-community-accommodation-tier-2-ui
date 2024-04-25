/* eslint-disable import/no-duplicates */
import { isBefore, isFuture, isToday } from 'date-fns'
import type { ObjectWithDateParts } from '@approved-premises/ui'

import {
  DateFormats,
  InvalidDateStringError,
  dateAndTimeInputsAreValidDates,
  dateIsTodayOrInTheFuture,
  getTodaysDatePlusMonthsAndDays,
  isMoreThanMonthsBetweenDates,
  differenceInDaysFromToday,
  isBeforeDate,
  dateIsComplete,
} from './dateUtils'

jest.mock('date-fns', () => {
  return {
    ...jest.requireActual('date-fns'),
    isFuture: jest.fn(() => true),
    isToday: jest.fn(() => false),
    isBefore: jest.fn(() => true),
  }
})

describe('DateFormats', () => {
  describe('convertIsoToDateObj', () => {
    it('converts a ISO8601 date string', () => {
      const date = '2022-11-11T00:00:00.000Z'

      expect(DateFormats.isoToDateObj(date)).toEqual(new Date(2022, 10, 11))
    })

    it('raises an error if the date is not a valid ISO8601 date string', () => {
      const date = '23/11/2022'

      expect(() => DateFormats.isoToDateObj(date)).toThrow(new InvalidDateStringError(`Invalid Date: ${date}`))
    })

    it('raises an error if the date is not a date string', () => {
      const date = 'NOT A DATE'

      expect(() => DateFormats.isoToDateObj(date)).toThrow(new InvalidDateStringError(`Invalid Date: ${date}`))
    })
  })

  describe('isoDateToUIDate', () => {
    it('converts a ISO8601 date string to a GOV.UK formatted date', () => {
      const date = '2022-11-11T00:00:00.000Z'

      expect(DateFormats.isoDateToUIDate(date)).toEqual('Friday 11 November 2022')
    })

    it('raises an error if the date is not a valid ISO8601 date string', () => {
      const date = '23/11/2022'

      expect(() => DateFormats.isoDateToUIDate(date)).toThrow(new InvalidDateStringError(`Invalid Date: ${date}`))
    })

    it('raises an error if the date is not a date string', () => {
      const date = 'NOT A DATE'

      expect(() => DateFormats.isoDateToUIDate(date)).toThrow(new InvalidDateStringError(`Invalid Date: ${date}`))
    })
  })

  describe('dateObjToUiDate', () => {
    it('converts a date to a short format date', () => {
      const date = new Date('2022-11-11T00:00:00.000Z')

      expect(DateFormats.dateObjtoUIDate(date, { format: 'short' })).toEqual('11/11/2022')
    })

    it('converts a date to a medium format date', () => {
      const date = new Date('2022-11-11T00:00:00.000Z')

      expect(DateFormats.dateObjtoUIDate(date, { format: 'medium' })).toEqual('11 November 2022')
    })

    it('converts a date to a long format date', () => {
      const date = new Date('2022-11-11T00:00:00.000Z')

      expect(DateFormats.dateObjtoUIDate(date)).toEqual('Friday 11 November 2022')
    })
  })

  describe('isoDateTimeToUIDateTime', () => {
    it('converts a ISO8601 date string to a GOV.UK formatted date', () => {
      const date = '2022-11-11T10:00:00.000Z'

      expect(DateFormats.isoDateTimeToUIDateTime(date)).toEqual('11 November 2022 at 10:00am')
    })

    it('raises an error if the date is not a valid ISO8601 date string', () => {
      const date = '23/11/2022'

      expect(() => DateFormats.isoDateTimeToUIDateTime(date)).toThrow(
        new InvalidDateStringError(`Invalid Date: ${date}`),
      )
    })

    it('raises an error if the date is not a date string', () => {
      const date = 'NOT A DATE'

      expect(() => DateFormats.isoDateTimeToUIDateTime(date)).toThrow(
        new InvalidDateStringError(`Invalid Date: ${date}`),
      )
    })
  })

  describe('convertDateAndTimeInputsToIsoString', () => {
    it('converts a date object', () => {
      const obj: ObjectWithDateParts<'date'> = {
        'date-year': '2022',
        'date-month': '12',
        'date-day': '11',
      }

      const result = DateFormats.dateAndTimeInputsToIsoString(obj, 'date')

      expect(result.date).toEqual('2022-12-11')
    })

    it('pads the months and days', () => {
      const obj: ObjectWithDateParts<'date'> = {
        'date-year': '2022',
        'date-month': '1',
        'date-day': '1',
      }

      const result = DateFormats.dateAndTimeInputsToIsoString(obj, 'date')

      expect(result.date).toEqual('2022-01-01')
    })

    it('returns the date with a time if passed one', () => {
      const obj: ObjectWithDateParts<'date'> = {
        'date-year': '2022',
        'date-month': '1',
        'date-day': '1',
        'date-time': '12:35',
      }

      const result = DateFormats.dateAndTimeInputsToIsoString(obj, 'date')

      expect(result.date).toEqual('2022-01-01T12:35:00.000Z')
    })

    it('returns an empty string when given empty strings as input', () => {
      const obj: ObjectWithDateParts<'date'> = {
        'date-year': '',
        'date-month': '',
        'date-day': '',
      }

      const result = DateFormats.dateAndTimeInputsToIsoString(obj, 'date')

      expect(result.date).toBeUndefined()
    })

    it('returns an invalid ISO string when given invalid strings as input', () => {
      const obj: ObjectWithDateParts<'date'> = {
        'date-year': 'twothousandtwentytwo',
        'date-month': '20',
        'date-day': 'foo',
      }

      const result = DateFormats.dateAndTimeInputsToIsoString(obj, 'date')

      expect(result.date.toString()).toEqual('twothousandtwentytwo-20-oo')
    })
  })

  describe('differenceInDays', () => {
    it('calls the date-fns functions and returns the results as an object', () => {
      const date1 = new Date(2023, 3, 12)
      const date2 = new Date(2023, 3, 11)

      expect(DateFormats.differenceInDays(date1, date2)).toEqual({
        ui: '1 day',
        number: 1,
      })
    })
  })

  describe('dateAndTimeInputsToUiDate', () => {
    it('converts a date and time input object to a human readable date', () => {
      const dateTimeInputs = { 'key-day': '1', 'key-month': '11', 'key-year': '2022' }

      expect(DateFormats.dateAndTimeInputsToUiDate(dateTimeInputs, 'key')).toEqual('1 November 2022')
    })

    it('throws an error if an object without date inputs for the key is entered', () => {
      expect(() => DateFormats.dateAndTimeInputsToUiDate({}, 'key')).toThrow(TypeError)
    })
  })

  describe('dateAndTimeInputsAreValidDates', () => {
    it('returns true when the date is valid', () => {
      const obj: ObjectWithDateParts<'date'> = {
        'date-year': '2022',
        'date-month': '12',
        'date-day': '11',
      }

      const result = dateAndTimeInputsAreValidDates(obj, 'date')

      expect(result).toEqual(true)
    })

    it('returns false when the date is invalid', () => {
      const obj: ObjectWithDateParts<'date'> = {
        'date-year': '99',
        'date-month': '99',
        'date-day': '99',
      }

      const result = dateAndTimeInputsAreValidDates(obj, 'date')

      expect(result).toEqual(false)
    })

    it('returns false when the year is not 4 digits', () => {
      const obj: ObjectWithDateParts<'date'> = {
        'date-year': '22',
        'date-month': '12',
        'date-day': '11',
      }

      const result = dateAndTimeInputsAreValidDates(obj, 'date')

      expect(result).toEqual(false)
    })

    it('returns false when empty object passed in', () => {
      const result = dateAndTimeInputsAreValidDates(undefined, 'date')

      expect(result).toEqual(false)
    })
  })

  describe('dateIsInTheFuture', () => {
    it('calls the date-fns function', () => {
      const obj: ObjectWithDateParts<'date'> = {
        'date-year': '2022',
        'date-month': '12',
        'date-day': '11',
      }

      dateIsTodayOrInTheFuture(obj, 'date')

      expect(isFuture).toHaveBeenCalled()
      expect(isToday).toHaveBeenCalled()
    })
  })

  describe('isMoreThanMonthsBetweenDates', () => {
    it('returns false when dates are not more than the given amount of months apart', () => {
      const monthsBetween = 6
      const obj: ObjectWithDateParts<'laterDate' | 'earlierDate'> = {
        'laterDate-year': '2022',
        'laterDate-month': '12',
        'laterDate-day': '11',
        'earlierDate-year': '2022',
        'earlierDate-month': '10',
        'earlierDate-day': '11',
      }

      const result = isMoreThanMonthsBetweenDates(obj, 'laterDate', 'earlierDate', monthsBetween)

      expect(result).toEqual(false)
    })

    it('returns true when dates are more than the given amount of months apart', () => {
      const monthsBetween = 1
      const obj: ObjectWithDateParts<'laterDate' | 'earlierDate'> = {
        'laterDate-year': '2022',
        'laterDate-month': '12',
        'laterDate-day': '11',
        'earlierDate-year': '2022',
        'earlierDate-month': '10',
        'earlierDate-day': '11',
      }

      const result = isMoreThanMonthsBetweenDates(obj, 'laterDate', 'earlierDate', monthsBetween)

      expect(result).toEqual(true)
    })

    it('returns true when dates are more than the given amount of months apart by a day', () => {
      const monthsBetween = 1
      const obj: ObjectWithDateParts<'laterDate' | 'earlierDate'> = {
        'laterDate-year': '2022',
        'laterDate-month': '11',
        'laterDate-day': '12',
        'earlierDate-year': '2022',
        'earlierDate-month': '10',
        'earlierDate-day': '11',
      }

      const result = isMoreThanMonthsBetweenDates(obj, 'laterDate', 'earlierDate', monthsBetween)

      expect(result).toEqual(true)
    })

    it('returns false when dates are equal to the given amount of months apart', () => {
      const monthsBetween = 1
      const obj: ObjectWithDateParts<'laterDate' | 'earlierDate'> = {
        'laterDate-year': '2022',
        'laterDate-month': '11',
        'laterDate-day': '11',
        'earlierDate-year': '2022',
        'earlierDate-month': '10',
        'earlierDate-day': '11',
      }

      const result = isMoreThanMonthsBetweenDates(obj, 'laterDate', 'earlierDate', monthsBetween)

      expect(result).toEqual(false)
    })
  })

  describe('differenceInDaysFromToday', () => {
    const createDateDaysFromNow = (daysFromNow = 0) => {
      const today = new Date()
      const dateDaysFromNow = new Date(today)
      dateDaysFromNow.setDate(today.getDate() + daysFromNow)

      return dateDaysFromNow
    }

    const createDateObj = (date: Date) => {
      const dateObj: ObjectWithDateParts<'date'> = {
        'date-year': date.getFullYear().toString(),
        'date-month': (date.getMonth() + 1).toString().padStart(2, '0'),
        'date-day': date.getDate().toString().padStart(2, '0'),
      }

      return dateObj
    }

    it('returns the difference in days from today for a given date', () => {
      const dateOneDayFromNow = createDateDaysFromNow(3)
      const obj = createDateObj(dateOneDayFromNow)

      const result = differenceInDaysFromToday(obj, 'date')

      expect(result).toEqual(3)
    })
  })

  describe('isBeforeDate', () => {
    it('calls the date-fns function with the given dates', () => {
      const obj: ObjectWithDateParts<'date' | 'dateToCompare'> = {
        'date-year': '2024',
        'date-month': '11',
        'date-day': '10',
        'dateToCompare-year': '2024',
        'dateToCompare-month': '11',
        'dateToCompare-day': '11',
      }

      isBeforeDate(obj, 'date', 'dateToCompare')

      expect(isBefore).toHaveBeenCalled()
    })
  })

  describe('getTodaysDatePlusMonthsAndDays', () => {
    it('returns a string of todays date', () => {
      const result = getTodaysDatePlusMonthsAndDays()

      expect(result.year).toBeTruthy()
      expect(result.month).toBeTruthy()
      expect(result.day).toBeTruthy()
      expect(result.formattedDate).toBeTruthy()
    })
  })

  describe('dateIsComplete', () => {
    it('returns true if the date is complete', () => {
      const date: ObjectWithDateParts<'field'> = {
        'field-day': '12',
        'field-month': '1',
        'field-year': '2022',
      }

      expect(dateIsComplete(date, 'field')).toEqual(true)
    })

    it('returns false if the date is blank', () => {
      const date: ObjectWithDateParts<'field'> = {
        'field-day': '',
        'field-month': '',
        'field-year': '',
      }

      expect(dateIsComplete(date, 'field')).toEqual(false)
    })

    it('returns false if a partial date is entered', () => {
      const date: ObjectWithDateParts<'field'> = {
        'field-day': '12',
        'field-month': '1',
        'field-year': '',
      }

      expect(dateIsComplete(date, 'field')).toEqual(false)
    })

    it('ignores irrelevant fields', () => {
      const date: ObjectWithDateParts<'field'> & ObjectWithDateParts<'otherField'> = {
        'field-day': '12',
        'field-month': '1',
        'field-year': '2022',
        'otherField-day': undefined,
        'otherField-month': undefined,
        'otherField-year': undefined,
      }

      expect(dateIsComplete(date, 'field')).toEqual(true)
    })
  })
})
