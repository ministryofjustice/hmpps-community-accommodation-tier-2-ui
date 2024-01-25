import { Page, expect } from '@playwright/test'
import { signInAsAdmin, viewSubmittedApplication } from '../steps/admin'
import { test } from '../test'

test('view a submitted application as an admin', async ({ page, adminUser, person }) => {
  await signOut(page)
  await signInAsAdmin(page, adminUser)
  await viewSubmittedApplication(page, person.name)
  await expect(page.locator('h1')).toContainText('Application answers')
})

const signOut = async (page: Page) => {
  await page.goto('/sign-out')
  await expect(page.locator('h1')).toContainText('Sign in')
}
