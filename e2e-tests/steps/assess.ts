import { Page, expect } from '@playwright/test'

export const updateStatus = async (page: Page) => {
  await page.getByRole('button', { name: 'Update application status' }).click()
  await expect(page.locator('h1')).toContainText(`What is the latest status`)
  await page.getByLabel('More information requested').check()
  await page.getByRole('button', { name: 'Save and continue' }).click()
  await page.getByLabel('Health needs').check()
  await page.getByRole('button', { name: 'Save and continue' }).click()
}

export const viewSubmittedApplication = async (page: Page) => {
  await page.goto('/assess/applications')
  await expect(page.locator('h1')).toContainText('Short-Term Accommodation (CAS-2) applications')
  await page.getByTestId('submitted-applications').getByRole('link').first().click()
  await page.getByRole('button', { name: 'View submitted application' }).click()
  await expect(page.locator('h1')).toContainText(`application`)
  await expect(page.locator('h2').first()).toContainText('Applicant details')
}

export const signInAsAssessor = async (
  page: Page,
  assessorUser: { name?: string; username: string; password: string },
) => {
  await page.getByLabel('Username').fill(assessorUser.username)
  await page.getByLabel('Password').fill(assessorUser.password)
  await page.getByRole('button', { name: 'Sign in' }).click()
}

export const addNote = async (page: Page) => {
  await page.getByLabel('Add a note for the referrer ', { exact: true }).fill('some notes for the referrer')
  await page.getByTestId('submit-button').click()
  await expect(page.locator('h2').first()).toContainText('Success')
}
