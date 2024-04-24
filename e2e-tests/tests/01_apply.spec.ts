import { expect } from '@playwright/test'
import { test } from '../test'
import {
  completeAboutThePersonSection,
  completeAreaAndFundingSection,
  completeBeforeYouStartSection,
  completeCheckAnswersSection,
  completeOffenceAndLicenceInformationSection,
  completeRisksAndNeedsSection,
  confirmApplicant,
  enterPrisonerNumber,
  startAnApplication,
  submitApplication,
  viewSubmittedApplication,
  addNote,
  viewApplicationFromPrisonDashboard,
} from '../steps/apply'

test('create a CAS-2 application', async ({ page, person }) => {
  await startAnApplication(page)
  await enterPrisonerNumber(page, person.nomsNumber)
  await confirmApplicant(page)
  await completeBeforeYouStartSection(page, person.name)
  await completeAreaAndFundingSection(page, person.name)
  await completeAboutThePersonSection(page, person.name)
  await completeRisksAndNeedsSection(page, person.name)
  await completeOffenceAndLicenceInformationSection(page, person.name)
  await completeCheckAnswersSection(page, person.name)
  await expect(page.getByText('You have completed 17 of 17 tasks')).toBeVisible()
  await submitApplication(page)
})

test('add a note to a submitted application', async ({ page, person }) => {
  await viewSubmittedApplication(page, person.name)
  await addNote(page)
  await expect(page.locator('.moj-timeline__title').first()).toContainText('Note')
})

test(`add a note to a submitted application created by another user within user's prison`, async ({ page, person }) => {
  const { name } = person
  const SEEDED_APPLICATION_ID = 'edd787eb-31a3-4fad-a473-9cf8969f1487'
  await viewApplicationFromPrisonDashboard(SEEDED_APPLICATION_ID, page, name)
  await addNote(page)
})
