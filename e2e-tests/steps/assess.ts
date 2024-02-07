import { Page, expect } from '@playwright/test'

export const updateStatus = async (page: Page, person: { crn: string; name: string; nomsNumber: string }) => {
  await page.getByRole('button', { name: 'Update application status' }).click()
  await expect(page.locator('h1')).toContainText(`What is the latest status of ${person.name}'s application?`)
  await page.getByLabel('More information requested').check()
  await page.getByRole('button', { name: 'Save and continue' }).click()
}

export const viewSubmittedApplication = async (
  page: Page,
  person: { crn: string; name: string; nomsNumber: string },
) => {
  await page.goto('/assess/applications')
  await expect(page.locator('h1')).toContainText('Short-Term Accommodation (CAS-2) applications')
  await page.getByRole('link', { name: person.name }).first().click()
  await page.getByRole('button', { name: 'View submitted application' }).click()
  await expect(page.locator('h1')).toContainText(`${person.name}'s application`)
}

export const signInAsAssessor = async (
  page: Page,
  assessorUser: { name?: string; username: string; password: string },
) => {
  await page.getByLabel('Username').fill(assessorUser.username)
  await page.getByLabel('Password').fill(assessorUser.password)
  await page.getByRole('button', { name: 'Sign in' }).click()
}
