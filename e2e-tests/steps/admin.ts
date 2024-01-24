import { Page, expect } from '@playwright/test'

export const viewSubmittedApplication = async (page: Page, name: string) => {
  await expect(page.locator('h1')).toContainText('CAS2: Short-term accommodation')
  await page.getByRole('link', { name: 'Submitted applications' }).click()
  await expect(page.locator('h1')).toContainText('Short-Term Accommodation (CAS-2) applications')
  await page.getByRole('link', { name }).first().click()
  await page.getByRole('button', { name: 'View submitted application' }).click()
}

export const signInAsAdmin = async (page, adminUser) => {
  await page.getByLabel('Username').fill(adminUser.username)
  await page.getByLabel('Password').fill(adminUser.password)
  await page.getByRole('button', { name: 'Sign in' }).click()
}
