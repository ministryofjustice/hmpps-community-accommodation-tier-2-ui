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
import {
  completeHealthNeedsTask,
  completeRiskToSelfTask,
  completeRoshTask,
  enterOldRiskToSelfOasysDate,
  enterOldRoshOasysDate,
} from './risksAndNeedsSection'
import { completeAreaInformationTask, completeFundingInformationTask } from './areaAndFundingSection'
import {
  completeCurrentOffencesTask,
  completeCPPDetailsAndHDCLicenceConditionsTask,
  completeOffenceHistoryTask,
} from './offenceAndLicenceInformationSection'
import { completeCheckAnswersTask } from './checkAnswersSection'
import { TestOptions } from '../testOptions'

export const startAnApplication = async (page: Page) => {
  // Start page
  // --------
  // visit the root url
  const dashboardPage = new DashboardPage(page)
  await dashboardPage.goto()

  // Follow link to 'new application'
  await dashboardPage.makeNewApplication()

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
  await confirmApplicantPage.clickButton('Confirm and continue')
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

export const enterOldOasysDates = async (page: Page, name: string) => {
  await enterOldRiskToSelfOasysDate(page, name)
  await enterOldRoshOasysDate(page, name)
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

export const viewInProgressDashboard = async (page: Page) => {
  await page.goto('/applications')
}

export const addNote = async (page: Page) => {
  const note = faker.lorem.paragraph()
  await page.getByLabel('Add a note for the assessor', { exact: true }).fill(note)
  await page.getByTestId('submit-button').click()
  await expect(page.locator('h2').first()).toContainText('Success')
  await expect(page.locator('.moj-timeline__description').first()).toContainText(note)
  await expect(page.locator('.moj-timeline__title').first()).toContainText('Note')
}

export const goToPrisonDashboard = async (page: Page) => {
  await page.goto(`/applications/prison`)
}

export const checkAnApplicationByUserExists = async (page: Page, name: string) => {
  const tableRows = page.locator('.govuk-table__row')
  expect(tableRows.filter({ hasText: name }).first()).toBeVisible()
}

export const viewApplicationMadeByAnotherUser = async (page: Page, name: string) => {
  const tableRows = page.locator('.govuk-table__row')
  const rowWithOtherUser = tableRows.filter({ hasNotText: name }).last()
  await rowWithOtherUser.getByRole('link').click()
  await expect(page.locator('h2').first()).toContainText('Application history')
}

export const createAnInProgressApplication = async (page: Page, person: TestOptions['person']) => {
  await startAnApplication(page)
  await enterPrisonerNumber(page, person.nomsNumber)
  await confirmApplicant(page)
}
