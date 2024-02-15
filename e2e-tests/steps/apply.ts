import { Page, expect } from '@playwright/test'

import { BeforeYouStartPage, DashboardPage, FindByPrisonNumberPage, TaskListPage } from '../pages/apply'
import {
  completeCheckInformationTask,
  completeConsentTask,
  completeEligibilityTask,
  completeReferrerDetailsTask,
} from './beforeYouStartSection'
import {
  completeAddressHistoryTask,
  completeEqualityAndDiversityTask,
  completePersonalInformationTask,
} from './aboutThePersonSection'
import { completeHealthNeedsTask, completeRiskToSelfTask, completeRoshTask } from './risksAndNeedsSection'
import { completeAreaInformationTask, completeFundingInformationTask } from './areaAndFundingSection'
import {
  completeCurrentOffencesTask,
  completeHDCLicenceAndCPPDetailsTask,
  completeOffenceHistoryTask,
} from './offenceAndLicenceInformationSection'
import { completeCheckAnswersTask } from './checkAnswersSection'

export const startAnApplication = async (page: Page) => {
  // Start page
  // --------
  // visit the root url
  const dashboardPage = new DashboardPage(page)
  await dashboardPage.goto()

  // Follow link to 'new referral'
  await dashboardPage.makeNewReferral()

  // // confirm that I'm ready to start
  const beforeYouStartPage = new BeforeYouStartPage(page)
  await beforeYouStartPage.startNow()
}

export const enterPrisonerNumber = async (page: Page, prisonNumber: string) => {
  const prisonNumberPage = new FindByPrisonNumberPage(page)
  await prisonNumberPage.enterPrisonNumber(prisonNumber)
  await prisonNumberPage.clickButton('Search for applicant')
}

export const confirmApplicant = async (page: Page) => {
  const confirmApplicantPage = new TaskListPage(page)
  confirmApplicantPage.clickButton('Confirm and continue')
}

export const completeBeforeYouStartSection = async (page: Page, name: string) => {
  await completeEligibilityTask(page, name)
  await completeConsentTask(page, name)
  await completeReferrerDetailsTask(page)
  await completeCheckInformationTask(page)
}

export const completeAreaAndFundingSection = async (page: Page, name: string) => {
  await completeAreaInformationTask(page, name)
  await completeFundingInformationTask(page, name)
}

export const completeAboutThePersonSection = async (page: Page, name: string) => {
  await completePersonalInformationTask(page, name)
  await completeEqualityAndDiversityTask(page, name)
  await completeAddressHistoryTask(page, name)
}

export const completeRisksAndNeedsSection = async (page: Page, name: string) => {
  await completeHealthNeedsTask(page, name)
  await completeRiskToSelfTask(page, name)
  await completeRoshTask(page, name)
}

export const completeOffenceAndLicenceInformationSection = async (page: Page, name: string) => {
  await completeCurrentOffencesTask(page, name)
  await completeOffenceHistoryTask(page, name)
  await completeHDCLicenceAndCPPDetailsTask(page, name)
}

export const completeCheckAnswersSection = async (page: Page, name: string) => {
  await completeCheckAnswersTask(page, name)
}

export const submitApplication = async (page: Page) => {
  await page.getByRole('button', { name: 'Submit application' }).click()
  await expect(page.locator('h1')).toContainText('Application complete')
}

export const viewSubmittedApplication = async (page: Page, name: string) => {
  await page.goto('/applications#submitted')
  await expect(page.locator('h1')).toContainText('Short-Term Accommodation (CAS-2) applications')
  await page.getByRole('link', { name }).first().click()
  await expect(page.locator('h1')).toContainText(name)
  await expect(page.locator('h2').first()).toContainText('Application history')
}

export const addNote = async (page: Page) => {
  await page.getByLabel('Add a note for the assessor ', { exact: true }).fill('some notes for the assessor')
  await page.getByTestId('submit-button').click()
  await expect(page.locator('h2').first()).toContainText('Success')
}
