import { Page, expect } from '@playwright/test'
import { test } from '../test'
import { signInAsMI, manageInformationReports, downloadReport, confirmColumnNames } from '../steps/reports'

test('Download submitted applications report', async ({ page, miUser }) => {
  await signOut(page)
  await signInAsMI(page, miUser)
  await manageInformationReports(page)
  const path = await downloadReport('submittedApplications', page)
  await confirmColumnNames('submittedApplications', path)
  await signOut(page)
})

test('Download application status updates report', async ({ page, miUser }) => {
  await signOut(page)
  await signInAsMI(page, miUser)
  await manageInformationReports(page)
  const path = await downloadReport('applicationStatusUpdates', page)
  await confirmColumnNames('applicationStatusUpdates', path)
  await signOut(page)
})

test('Download un-submitted applications report', async ({ page, miUser }) => {
  await signOut(page)
  await signInAsMI(page, miUser)
  await manageInformationReports(page)
  const path = await downloadReport('unsubmittedApplications', page)
  await confirmColumnNames('unsubmittedApplications', path)
  await signOut(page)
})

const signOut = async (page: Page) => {
  await page.goto('/sign-out')
  await expect(page.locator('h1')).toContainText('Sign in')
}
