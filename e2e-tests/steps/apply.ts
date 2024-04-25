import { Page, expect } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/en_GB'

import { BeforeYouStartPage, DashboardPage, FindByPrisonNumberPage, TaskListPage } from '../pages/apply'
import {
  completeCheckInformationTask,
  completeConsentTask,
  completeEligibilityTask,
  completeReferrerDetailsTask,
  completeHDCLicenceDatesTask,
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
  completeCPPDetailsAndHDCLicenceConditionsTask,
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
  await completeHDCLicenceDatesTask(page, name)
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
  await completeCPPDetailsAndHDCLicenceConditionsTask(page, name)
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
  await expect(page.locator('h1')).toContainText('Your CAS-2 applications')
  await page.getByRole('link', { name }).first().click()
  await expect(page.locator('h1')).toContainText(name)
  await expect(page.locator('h2').first()).toContainText('Application history')
}

export const addNote = async (page: Page) => {
  const note = faker.lorem.paragraph()
  await page.getByLabel('Add a note for the assessor', { exact: true }).fill(note)
  await page.getByTestId('submit-button').click()
  await expect(page.locator('h2').first()).toContainText('Success')
  await expect(page.locator('.moj-timeline__description').first()).toContainText(note)
  await expect(page.locator('.moj-timeline__title').first()).toContainText('Note')
}

export const viewApplicationFromPrisonDashboard = async (applicationId: string, page: Page) => {
  await page.goto(`/applications/prison`)
  await page.locator(`a[href="/applications/${applicationId}/overview"]`).click()
  await expect(page.locator('h2').first()).toContainText('Application history')
}

export const signInAsPom = async (page: Page, pomUser: { name?: string; username: string; password: string }) => {
  await page.goto('/')
  await page.getByLabel('Username').fill(pomUser.username)
  await page.getByLabel('Password').fill(pomUser.password)
  await page.getByRole('button', { name: 'Sign in' }).click()
}
