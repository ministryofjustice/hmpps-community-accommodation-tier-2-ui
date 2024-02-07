import { Page } from '@playwright/test'
import { ApplyPage, TaskListPage } from '../pages/apply'

export const completeCheckAnswersTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Check application answers')
  const checkAnswersPage = await ApplyPage.initialize(page, `Check ${name}'s application`)
  await checkAnswersPage.checkCheckboxes([
    'I confirm to the best of my knowledge, the information provided in this referral is accurate and, where required, it has been verified by all relevant prison departments.',
  ])
  await checkAnswersPage.clickContinue()
}
