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
  enterOldOasysDates,
  goToPrisonDashboard,
  checkAnApplicationByUserExists,
  viewInProgressDashboard,
  createAnInProgressApplication,
} from '../steps/apply'
import { signIn } from '../steps/signIn'
import { cancelAnApplication, clickCancel } from '../steps/cancelInProgressApplication'

test('create a CAS-2 application', async ({ page, person, pomUser }) => {
  await signIn(page, pomUser)
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

test('add a note to a submitted application', async ({ page, person, pomUser }) => {
  await signIn(page, pomUser)
  await viewSubmittedApplication(page, person.name)
  await addNote(page)
  await expect(page.locator('.moj-timeline__title').first()).toContainText('Note')
})

test(`add a note to a submitted application created by another user within user's prison`, async ({
  page,
  pomUser,
}) => {
  await signIn(page, pomUser)
  await goToPrisonDashboard(page)
  await checkAnApplicationByUserExists(page, pomUser.name)
  await viewApplicationMadeByAnotherUser(page, pomUser.name)
  await addNote(page)
})

test('create a CAS-2 application with no OASys', async ({ page, personWithoutOasys, pomUser }) => {
  await signIn(page, pomUser)
  await startAnApplication(page)
  await enterPrisonerNumber(page, personWithoutOasys.nomsNumber)
  await confirmApplicant(page)
  await completeBeforeYouStartSection(page, personWithoutOasys.name)
  await enterOldOasysDates(page, personWithoutOasys.name)
})

test('cancel an in progress application from the task list', async ({ page, pomUser, person }) => {
  await signIn(page, pomUser)
  await createAnInProgressApplication(page, person)
  await viewInProgressDashboard(page)
  const numberOfApplicationsBeforeCancellation = (await page.locator('tr').all()).length
  await clickCancel(page, person.name)
  await cancelAnApplication(page, person.name)
  const numberOfApplicationsAfterCancellation = (await page.locator('tr').all()).length
  await expect(page.getByText('Your CAS-2 applications')).toBeVisible()
  expect(numberOfApplicationsBeforeCancellation - numberOfApplicationsAfterCancellation).toEqual(1)
})
