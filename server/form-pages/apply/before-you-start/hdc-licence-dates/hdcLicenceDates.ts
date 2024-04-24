import { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import type { ObjectWithDateParts } from '@approved-premises/ui'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'
import {
  dateAndTimeInputsAreValidDates,
  DateFormats,
  dateIsTodayOrInTheFuture,
  isBeforeDate,
  differenceInDaysFromToday,
  isMoreThanMonthsBetweenDates,
  dateIsComplete,
} from '../../../../utils/dateUtils'
import { dateBodyProperties } from '../../../utils'

type HDCLicenceDatesBody = ObjectWithDateParts<'hdcEligibilityDate'> & ObjectWithDateParts<'conditionalReleaseDate'>

const MAX_MONTHS_BETWEEN_HDC_AND_CRD = 6
const MAX_DAYS_BETWEEN_TODAY_AND_CRD_FOR_WARNING = 21
const MAX_DAYS_BETWEEN_TODAY_AND_CRD_FOR_INELIGIBILITY = 10
@Page({
  name: 'hdc-licence-dates',
  bodyProperties: [...dateBodyProperties('hdcEligibilityDate'), ...dateBodyProperties('conditionalReleaseDate')],
})
export default class HDCLicenceDates implements TaskListPage {
  documentTitle = `The person's Home Detention Curfew (HDC) licence dates`

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `${this.personName}'s Home Detention Curfew (HDC) licence dates`

  questions = getQuestions(this.personName)['hdc-licence-dates']['hdc-licence-dates']

  options: Record<string, string>

  body: HDCLicenceDatesBody

  constructor(
    body: Partial<HDCLicenceDatesBody>,
    private readonly application: Application,
  ) {
    this.body = body as HDCLicenceDatesBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    const differenceBetweenCrdAndTodaysDate = differenceInDaysFromToday(this.body, 'conditionalReleaseDate')
    const isWithinWarningRange =
      differenceBetweenCrdAndTodaysDate < MAX_DAYS_BETWEEN_TODAY_AND_CRD_FOR_WARNING &&
      differenceBetweenCrdAndTodaysDate > MAX_DAYS_BETWEEN_TODAY_AND_CRD_FOR_INELIGIBILITY
    const isWithinIneligibleRange =
      differenceBetweenCrdAndTodaysDate <= MAX_DAYS_BETWEEN_TODAY_AND_CRD_FOR_INELIGIBILITY

    if (isWithinWarningRange) {
      return 'hdc-warning'
    }

    if (isWithinIneligibleRange) {
      return 'hdc-ineligible'
    }

    return ''
  }

  response() {
    return {
      'HDC eligibility date': DateFormats.dateAndTimeInputsToUiDate(this.body, 'hdcEligibilityDate'),
      'Conditional release date': DateFormats.dateAndTimeInputsToUiDate(this.body, 'conditionalReleaseDate'),
    }
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!dateIsComplete(this.body, 'hdcEligibilityDate')) {
      errors.hdcEligibilityDate = "Enter the applicant's HDC eligibility date"
    } else if (!dateAndTimeInputsAreValidDates(this.body, 'hdcEligibilityDate')) {
      errors.hdcEligibilityDate = 'Eligibility date must be a real date'
    }

    if (!dateIsComplete(this.body, 'conditionalReleaseDate')) {
      errors.conditionalReleaseDate = "Enter the applicant's conditional release date"
    } else if (!dateAndTimeInputsAreValidDates(this.body, 'conditionalReleaseDate')) {
      errors.conditionalReleaseDate = 'Conditional release date must be a real date'
    } else if (!dateIsTodayOrInTheFuture(this.body, 'conditionalReleaseDate')) {
      errors.conditionalReleaseDate = 'Conditional release date cannot be in the past'
    }

    if (errors.hdcEligibilityDate || errors.conditionalReleaseDate) {
      return errors
    }

    if (
      isMoreThanMonthsBetweenDates(
        this.body,
        'conditionalReleaseDate',
        'hdcEligibilityDate',
        MAX_MONTHS_BETWEEN_HDC_AND_CRD,
      )
    ) {
      errors.hdcEligibilityDate =
        'HDC eligibility date cannot be more than 6 months before the conditional release date'
    }
    if (!isBeforeDate(this.body, 'hdcEligibilityDate', 'conditionalReleaseDate')) {
      errors.hdcEligibilityDate = 'HDC eligibility date must be before the conditional release date'
    }
    return errors
  }
}
