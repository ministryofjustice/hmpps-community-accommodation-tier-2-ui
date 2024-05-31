import { Page } from '@playwright/test'
import { ApplyPage } from 'e2e-tests/pages/apply'

export const cancelAnApplication = async (page: Page, name: string) => {
  const cancelPage = await ApplyPage.initialize(page, `Are you sure you would like to cancel ${name}'s application?`)
  await cancelPage.checkRadio('Yes, cancel the application')
  await cancelPage.clickButton('Confirm')
}

export const clickCancel = async (page: Page, name: string) => {
  const tableRows = page.locator('.govuk-table__row')
  const rowWithPersonIn = tableRows.filter({ hasText: name }).first()
  await rowWithPersonIn.getByRole('link', { name: 'Cancel' }).click()
}
