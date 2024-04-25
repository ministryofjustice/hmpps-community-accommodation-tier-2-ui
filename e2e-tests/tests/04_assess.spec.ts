import { expect } from '@playwright/test'
import { updateStatus, viewSubmittedApplication, addNote, addAssessmentDetails } from '../steps/assess'
import { test } from '../test'
import { signIn } from '../steps/signIn'

test('view a submitted application as an assessor', async ({ page, assessorUser }) => {
  await signIn(page, assessorUser)
  await viewSubmittedApplication(page)
  await updateStatus(page)
  await expect(page.locator('.moj-timeline__title').first()).toContainText('More information requested')
  await addNote(page)
  await addAssessmentDetails(page)
})
