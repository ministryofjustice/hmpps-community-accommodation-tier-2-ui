import { Page, expect } from '@playwright/test'

export const viewSubmittedApplication = async (page: Page) => {
  await expect(page.locator('h1')).toContainText('CAS-2: Short-Term Accommodation')
  await page.getByRole('link', { name: 'Submitted applications' }).click()
  await expect(page.locator('h1')).toContainText('Short-Term Accommodation (CAS-2) applications')
  await page.getByTestId('submitted-applications').getByRole('link').first().click()
  await page.getByRole('button', { name: 'View submitted application' }).click()
}
