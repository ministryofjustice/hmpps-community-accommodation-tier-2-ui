import { Page, expect } from '@playwright/test'
import { signInAsAssessor, updateStatus, viewSubmittedApplication } from '../steps/assess'
import { test } from '../test'

test('view a submitted application as an assessor', async ({ page, assessorUser }) => {
  await signOut(page)
  await signInAsAssessor(page, assessorUser)
  await viewSubmittedApplication(page)
  await updateStatus(page)
  await expect(page.locator('.moj-timeline__title').first()).toContainText('More information requested')
})

const signOut = async (page: Page) => {
  await page.goto('/sign-out')
  await expect(page.locator('h1')).toContainText('Sign in')
}
