import { expect } from '@playwright/test'
import { test } from '../test'
import { signInAsAdmin, viewSubmittedApplication } from '../steps/admin'

test('view a submitted application as an admin', async ({ page, adminUser, person }) => {
  await signOut(page)
  await signInAsAdmin(page, adminUser)
  await viewSubmittedApplication(page, person.name)
  await expect(page.locator('h1')).toContainText('Application answers')
})

const signOut = async page => {
  await page.goto('/sign-out')
  await expect(page.locator('h1')).toContainText('Sign in')
}
