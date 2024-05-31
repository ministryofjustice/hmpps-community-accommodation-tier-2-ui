import { Page } from '@playwright/test'
import { ApplyPage } from 'e2e-tests/pages/apply'

export const cancelAnApplication = async (page: Page, name: string) => {
  const cancelPage = await ApplyPage.initialize(page, `Are you sure you would like to cancel ${name}'s application?`)
  await cancelPage.checkRadio('Yes, cancel the application')
  await cancelPage.clickButton('Confirm')
}

export const clickCancel = async (page: Page) => {
  await page.getByRole('link', { name: 'Cancel' }).last().click()
}
