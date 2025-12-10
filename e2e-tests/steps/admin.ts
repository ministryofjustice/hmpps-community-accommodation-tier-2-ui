import { Page, expect } from '@playwright/test'

export const viewSubmittedApplication = async (page: Page) => {
  await expect(page.locator('h1')).toContainText('CAS2 for HDC')
  await page.getByRole('link', { name: 'Submitted applications' }).click()
  await expect(page.locator('h1')).toContainText('Short-Term Accommodation (CAS2 HDC) applications')
  await page.getByTestId('submitted-applications').getByRole('link').first().click()
  await page.getByRole('button', { name: 'View submitted application' }).click()
}
