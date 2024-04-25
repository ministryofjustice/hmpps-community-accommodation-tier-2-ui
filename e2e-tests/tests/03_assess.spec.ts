import { Page, expect } from '@playwright/test'
import {
  signInAsAssessor,
  updateStatus,
  viewSubmittedApplication,
  addNote,
  addAssessmentDetails,
} from '../steps/assess'
import { test } from '../test'

test('view a submitted application as an assessor', async ({ page, assessorUser }) => {
  await signInAsAssessor(page, assessorUser)
  await viewSubmittedApplication(page)
  await updateStatus(page)
  await expect(page.locator('.moj-timeline__title').first()).toContainText('More information requested')
  await addNote(page)
  await addAssessmentDetails(page)
})
