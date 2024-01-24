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
  await completeCheckAnswersSection(page)
  await expect(page.getByText('You have completed 16 of 16 tasks')).toBeVisible()
  await submitApplication(page)
})
