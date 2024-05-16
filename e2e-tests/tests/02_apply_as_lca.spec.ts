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
  viewApplicationMadeByAnotherUser,
  goToPrisonDashboard,
  checkAnApplicationByUserExists,
} from '../steps/apply'
import { signIn } from '../steps/signIn'

test('create a CAS-2 application', async ({ page, person, lcaUser }) => {
  await signIn(page, lcaUser)
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

test('add a note to a submitted application', async ({ page, person, lcaUser }) => {
  await signIn(page, lcaUser)
  await viewSubmittedApplication(page, person.name)
  await addNote(page)
  await expect(page.locator('.moj-timeline__title').first()).toContainText('Note')
})

test(`add a note to a submitted application created by another user within user's prison`, async ({
  page,
  lcaUser,
}) => {
  await signIn(page, lcaUser)
  await goToPrisonDashboard(page)
  await checkAnApplicationByUserExists(page, lcaUser.name)
  await viewApplicationMadeByAnotherUser(page, lcaUser.name)
  await addNote(page)
})
