import { Page, expect } from '@playwright/test'
import { signInAsAssessor, updateStatus, viewSubmittedApplication } from '../steps/assess'
import { test } from '../test'

test('view a submitted application as an admin', async ({ page, assessorUser, person }) => {
  await signOut(page)
  await signInAsAssessor(page, assessorUser)
  await viewSubmittedApplication(page, person)
  await updateStatus(page, person)
  await expect(page.locator('h1')).toContainText(person.name)
})

const signOut = async (page: Page) => {
  await page.goto('/sign-out')
  await expect(page.locator('h1')).toContainText('Sign in')
}
