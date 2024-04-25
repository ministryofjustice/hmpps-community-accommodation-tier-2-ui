import { expect } from '@playwright/test'
import { signInAsAdmin, viewSubmittedApplication } from '../steps/admin'
import { test } from '../test'

test('view a submitted application as an admin', async ({ page, adminUser }) => {
  await signInAsAdmin(page, adminUser)
  await viewSubmittedApplication(page)
  await expect(page.locator('h1')).toContainText('application')
  await expect(page.locator('h2').first()).toContainText('Applicant details')
})
