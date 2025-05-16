import { expect, Page } from '@playwright/test'
import { TestOptions } from 'e2e-tests/testOptions'
import { ApplyPage, TaskListPage } from '../pages/apply'

export const completeCheckAnswersTask = async (page: Page, name: string, user: TestOptions['pomUser']) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Check application answers')
  await verifySectionDetails(page, '#add-referrer-details', [
    { key: 'Name', value: user.name },
    { key: 'Email address', value: user.email },
  ])

  const checkAnswersPage = await ApplyPage.initialize(page, `Check ${name}'s application`)
  await checkAnswersPage.checkCheckboxes([
    'I confirm to the best of my knowledge, the information provided in this referral is accurate and, where required, it has been verified by all relevant prison departments.',
  ])
  await checkAnswersPage.clickContinue()
}

async function verifySectionDetails(
  page: Page,
  sectionReference: string,
  keyValuePairs: Array<{ key: string; value: string }>,
) {
  const section = page.locator(sectionReference)

  const sectionDetailChecks = keyValuePairs.map(({ key, value }) => {
    const valueLocator = section.locator(`dt:has-text("${key}") + dd`)
    return expect(valueLocator).toHaveText(value)
  })

  await Promise.all(sectionDetailChecks)
}
