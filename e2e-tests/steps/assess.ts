import { Page, expect } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/en_GB'

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

export const addNote = async (page: Page) => {
  const note = faker.lorem.paragraph()
  await page.getByLabel('Add a note for the referrer', { exact: true }).fill(note)
  await page.getByTestId('submit-button').click()
  await expect(page.locator('h2').first()).toContainText('Success')
  await expect(page.locator('.moj-timeline__description').first()).toContainText(note)
}

export const addAssessmentDetails = async (page: Page) => {
  await page.locator('button').filter({ hasText: 'Actions' }).click()
  await page.getByTestId('add-assessment-details').click()

  await page.getByLabel('Assessor name').fill('John Doe')
  await page.getByLabel('Nacro CAS-2 reference number').fill('123456')
  await page.getByTestId('save-assessment-details').click()

  await expect(page.locator('h2').first()).toContainText('Success')
  await expect(page.getByTestId('assessor-name')).toContainText('John Doe')
  await expect(page.getByTestId('cas2-ref-number')).toContainText('123456')
}
