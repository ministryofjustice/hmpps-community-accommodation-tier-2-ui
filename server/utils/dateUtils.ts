/* eslint-disable */
import type { ObjectWithDateParts } from '@approved-premises/ui'

import {
  differenceInCalendarDays,
  differenceInDays,
  differenceInMonths,
  formatDistanceStrict,
  formatISO,
  parseISO,
  format,
  isBefore,
  isFuture,
  isToday,
} from 'date-fns'

type DifferenceInDays = { ui: string; number: number }
export type StructuredDate = { year: string; month: string; day: string; formattedDate: string }
export class DateFormats {
  /**
   * @param date JS Date object.
   * @returns the date in the format '2019-09-18'.
   */
  static dateObjToIsoDate(date: Date) {
    return formatISO(date, { representation: 'date' })
  }

  /**
   * @param date JS Date object.
   * @returns the date in the format '2019-09-18T19:00:52Z'.
   */
  static dateObjToIsoDateTime(date: Date) {
    return formatISO(date)
  }

  /**
   * @param date JS Date object.
   * @returns the date in the to be shown in the UI: "Thursday, 20 December 2012".
   */
  static dateObjtoUIDate(date: Date, options: { format: 'short' | 'medium' | 'long' } = { format: 'long' }) {
    if (options.format === 'long') {
      return format(date, 'cccc d MMMM y')
    }
    if (options.format === 'medium') {
      return format(date, 'd MMMM y')
    } else {
      return format(date, 'dd/LL/y')
    }
  }

  /**
   * Converts an ISO8601 datetime string into a Javascript Date object.
   * @param date An ISO8601 datetime string
   * @returns A Date object
   * @throws {InvalidDateStringError} If the string is not a valid ISO8601 datetime string
   */
  static isoToDateObj(date: string) {
    const parsedDate = parseISO(date)

    if (Number.isNaN(parsedDate.getTime())) {
      throw new InvalidDateStringError(`Invalid Date: ${date}`)
    }

    return parsedDate
  }

  /**
   * @param isoDate an ISO date string.
   * @returns the date in the to be shown in the UI: "Thursday, 20 December 2012".
   */
  static isoDateToUIDate(isoDate: string, options: { format: 'short' | 'long' | 'medium' } = { format: 'long' }) {
    return DateFormats.dateObjtoUIDate(DateFormats.isoToDateObj(isoDate), options)
  }

  /**
   * @param isoDate an ISO date string.
   * @returns the date in the to be shown in the UI: "Thursday, 20 December 2012".
   */
  static isoDateTimeToUIDateTime(isoDate: string) {
    return format(DateFormats.isoToDateObj(isoDate), "d MMMM y 'at' HH:mmaaa")
  }

  /**
   * Converts input for a GDS date input https://design-system.service.gov.uk/components/date-input/
   * into an ISO8601 date string
   * @param dateInputObj an object with date parts (i.e. `-month` `-day` `-year`), which come from a `govukDateInput`.
   * @param key the key that prefixes each item in the dateInputObj, also the name of the property which the date object will be returned in the return value.
   * @returns an ISO8601 date string.
   */
  static dateAndTimeInputsToIsoString<K extends string | number>(dateInputObj: ObjectWithDateParts<K>, key: K) {
    const day = `0${dateInputObj[`${key}-day`]}`.slice(-2)
    const month = `0${dateInputObj[`${key}-month`]}`.slice(-2)
    const year = dateInputObj[`${key}-year`]
    const time = dateInputObj[`${key}-time`]

    const o: { [P in K]?: string } = dateInputObj
    if (day && month && year) {
      if (time) {
        o[key] = `${year}-${month}-${day}T${time}:00.000Z`
      } else {
        o[key] = `${year}-${month}-${day}`
      }
    } else {
      o[key] = undefined
    }

    return dateInputObj
  }

  /**
   * Converts input for a GDS date input https://design-system.service.gov.uk/components/date-input/
   * into a human readable date for the user
   * @param dateInputObj an object with date parts (i.e. `-month` `-day` `-year`), which come from a `govukDateInput`.
   * @param key the key that prefixes each item in the dateInputObj, also the name of the property which the date object will be returned in the return value.
   * @returns a friendly date.
   */
  static dateAndTimeInputsToUiDate(
    dateInputObj: Record<string, string>,
    key: string | number,
    format = 'medium' as 'short' | 'long' | 'medium',
  ) {
    const iso8601Date = DateFormats.dateAndTimeInputsToIsoString(dateInputObj, key)[key]

    return DateFormats.isoDateToUIDate(iso8601Date, { format: format })
  }

  /**
   * @param date1 first day to compare.
   * @param date2 second day to compare.
   * @returns {DifferenceInDays} an object with the difference in days as a string for UI purposes (EG '2 Days') and as a number.
   */
  static differenceInDays(date1: Date, date2: Date): DifferenceInDays {
    return { ui: formatDistanceStrict(date1, date2, { unit: 'day' }), number: differenceInDays(date1, date2) }
  }
}

export const dateAndTimeInputsAreValidDates = <K extends string | number>(
  dateInputObj: ObjectWithDateParts<K>,
  key: K,
): boolean => {
  if (!dateInputObj) {
    return false
  }

  const inputYear = dateInputObj[`${key}-year`] as string

  if (inputYear && inputYear.length !== 4) return false

  const dateString = DateFormats.dateAndTimeInputsToIsoString(dateInputObj, key)

  try {
    DateFormats.isoToDateObj(dateString[key])
  } catch (err) {
    if (err instanceof InvalidDateStringError || err instanceof TypeError) {
      return false
    }
  }

  return true
}

/**
 * @param dateInputObj an object with date parts (i.e. `-month` `-day` `-year`), which come from a `govukDateInput`.
 * @param key The date key for the date to check.
 * @returns a boolean.
 */
export const dateIsTodayOrInTheFuture = <K extends string | number>(
  dateInputObj: ObjectWithDateParts<K>,
  key: K,
): boolean => {
  const dateIsoStrings = DateFormats.dateAndTimeInputsToIsoString(dateInputObj, key)
  const date = DateFormats.isoToDateObj(dateIsoStrings[key])

  return isToday(date) || isFuture(date)
}

/**
 * @param dateInputObj an object with date parts (i.e. `-month` `-day` `-year`), which come from a `govukDateInput`.
 * @param laterKey The date key for the later date.
 * @param earlierKey The date key for the earlier date.
 * @param months number of months to check between the two dates.
 * @returns a boolean.
 */
export const isMoreThanMonthsBetweenDates = <K extends string | number>(
  dateInputObj: ObjectWithDateParts<K>,
  laterKey: K,
  earlierKey: K,
  months: number,
): boolean => {
  const laterDateIsoStrings = DateFormats.dateAndTimeInputsToIsoString(dateInputObj, laterKey)
  const earlierDateIsoStrings = DateFormats.dateAndTimeInputsToIsoString(dateInputObj, earlierKey)

  const laterDate = DateFormats.isoToDateObj(laterDateIsoStrings[laterKey])
  const earlierDate = DateFormats.isoToDateObj(earlierDateIsoStrings[earlierKey])

  const monthDifference = differenceInMonths(laterDate, earlierDate)

  if (monthDifference > months) {
    return true
  }

  if (monthDifference === months) {
    const dateAfterSixMonths = new Date(earlierDate.setMonth(earlierDate.getMonth() + months))

    const dayDifference = differenceInDays(laterDate, dateAfterSixMonths)

    return dayDifference >= 1
  }

  return false
}

/**
 * @param dateInputObj an object with date parts (i.e. `-month` `-day` `-year`), which come from a `govukDateInput`.
 * @param key The date key for the date.
 * @returns a boolean.
 */
export const differenceInDaysFromToday = <K extends string | number>(
  dateInputObj: ObjectWithDateParts<K>,
  key: K,
): number => {
  const dateIsoStrings = DateFormats.dateAndTimeInputsToIsoString(dateInputObj, key)

  const date = DateFormats.isoToDateObj(dateIsoStrings[key])
  const todaysDate = new Date()

  return differenceInCalendarDays(date, todaysDate)
}

/**
 * @param dateInputObj an object with date parts (i.e. `-month` `-day` `-year`), which come from a `govukDateInput`.
 * @param dateKey The date key for the date that should be before the other one to return true.
 * @param dateToCompareKey The date key for the date to compare with.
 * @returns a boolean.
 */
export const isBeforeDate = <K extends string | number>(
  dateInputObj: ObjectWithDateParts<K>,
  dateKey: K,
  dateToCompareKey: K,
): boolean => {
  const dateIsoStrings = DateFormats.dateAndTimeInputsToIsoString(dateInputObj, dateKey)
  const dateToCompareIsoStrings = DateFormats.dateAndTimeInputsToIsoString(dateInputObj, dateToCompareKey)

  const date = DateFormats.isoToDateObj(dateIsoStrings[dateKey])
  const dateToCompare = DateFormats.isoToDateObj(dateToCompareIsoStrings[dateToCompareKey])

  return isBefore(date, dateToCompare)
}

/**
 * @param monthsToAdd the number of months to add to todays date
 * @returns {StructuredDate} an object that contains the computed date in parts e.g `year: 2024` and in whole e.g `2024-05-12`
 */
export const getTodaysDatePlusMonthsAndDays = (monthsToAdd = 0, daysToAdd = 0): StructuredDate => {
  const date = new Date()
  date.setMonth(date.getMonth() + monthsToAdd)
  date.setDate(date.getDate() + daysToAdd)

  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return {
    year,
    month,
    day,
    formattedDate: `${year}-${month}-${day}`,
  }
}

export class InvalidDateStringError extends Error {}

export const dateIsComplete = <K extends string | number>(
  dateInputObj: Partial<ObjectWithDateParts<K>>,
  key: K,
): boolean => {
  const dateParts = ['year', 'month', 'day'] as const
  let allPartsExist = true

  for (const part of dateParts) {
    const keyExists = Boolean(dateInputObj[`${key}-${part}`])
    if (!keyExists) {
      allPartsExist = false
      break
    }
  }

  return allPartsExist
}
