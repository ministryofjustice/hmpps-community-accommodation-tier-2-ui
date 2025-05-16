import { Page } from '@playwright/test'
import { ApplyPage, TaskListPage } from '../pages/apply'
import { getTodaysDatePlusMonthsAndDays } from '../../server/utils/dateUtils'

export const completeEligibilityTask = async (page: Page, name: string) => {
  const confirmEligibilityPage = await ApplyPage.initialize(
    page,
    `Check ${name} is eligible for Short-Term Accommodation (CAS-2)`,
  )

  await confirmEligibilityPage.checkRadio('Yes')
  await confirmEligibilityPage.clickSave()
}

export const completeConsentTask = async (page: Page, name: string) => {
  const confirmConsentPage = await ApplyPage.initialize(
    page,
    `Confirm ${name}'s consent to apply for Short-Term Accommodation (CAS-2)`,
  )

  await confirmConsentPage.checkRadio(`Yes, ${name} has given their consent`)
  await confirmConsentPage.fillDateFieldInGroup('When did they give consent?', {
    year: '2022',
    month: '3',
    day: '1',
  })
  await confirmConsentPage.clickSave()
}

export const completeHDCLicenceDatesTask = async (page: Page, name: string) => {
  const hdcDate = getTodaysDatePlusMonthsAndDays()
  const crdDate = getTodaysDatePlusMonthsAndDays(2)

  const hdcLicenceDatesPage = await ApplyPage.initialize(page, `${name}'s Home Detention Curfew (HDC) licence dates`)
  await hdcLicenceDatesPage.fillDateFieldInGroup(`What is ${name}'s HDC eligibility date?`, {
    year: hdcDate.year,
    month: hdcDate.month,
    day: hdcDate.day,
  })
  await hdcLicenceDatesPage.fillDateFieldInGroup(`What is ${name}'s conditional release date?`, {
    year: crdDate.year,
    month: crdDate.month,
    day: crdDate.day,
  })
  await hdcLicenceDatesPage.clickSave()
}

export const completeReferrerDetailsTask = async (page: Page): Promise<string> => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add referrer details')

  const userEmail = await completeConfirmDetailsPage(page)
  await completeJobTitlePage(page)
  await completeContactNumberPage(page)

  return userEmail
}

async function completeConfirmDetailsPage(page: Page): Promise<string> {
  const confirmDetailsPage = await ApplyPage.initialize(page, `Confirm your details`)
  const email = await page.locator(`dt:has-text("Email address") + dd`).textContent()

  await confirmDetailsPage.clickSave()
  return email?.trim() || ''
}

async function completeJobTitlePage(page: Page) {
  const jobTitlePage = await ApplyPage.initialize(page, `What is your job title?`)

  await jobTitlePage.fillField('What is your job title?', 'POM')

  await jobTitlePage.clickSave()
}

async function completeContactNumberPage(page: Page) {
  const confirmDetailsPage = await ApplyPage.initialize(page, `What is your contact telephone number?`)

  await confirmDetailsPage.fillField('What is your contact telephone number?', '12345')

  await confirmDetailsPage.clickSave()
}

export const completeCheckInformationTask = async (page: Page) => {
  const checkInformationPage = new TaskListPage(page)
  await checkInformationPage.clickTask('Check information needed from the applicant')

  await checkInformationPage.checkRadio('Yes')
  await checkInformationPage.clickSave()
}
