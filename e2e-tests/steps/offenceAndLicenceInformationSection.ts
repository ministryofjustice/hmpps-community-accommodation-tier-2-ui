import { Page } from '@playwright/test'
import { ApplyPage, TaskListPage } from '../pages/apply'

export const completeCurrentOffencesTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add current offences')

  await completeCurrentOffenceDetailsPage(page, name)
  await completeCurrentOffencesPage(page, name)
}

async function completeCurrentOffenceDetailsPage(page: Page, name: string) {
  const currentOffenceDetailsPage = await ApplyPage.initialize(page, `Add ${name}'s current offence details`)
  await currentOffenceDetailsPage.fillField('Offence title', 'Stalking')
  await currentOffenceDetailsPage.chooseSelectItem('Offence type', 'Stalking or Harassment')
  await currentOffenceDetailsPage.fillDateFieldInGroup('When did they commit the offence?', {
    year: '2022',
    month: '3',
    day: '1',
  })
  await currentOffenceDetailsPage.fillField('How long were they sentenced for?', '6 months')
  await currentOffenceDetailsPage.fillField('Provide a summary of the offence', 'an offence summary')
  await currentOffenceDetailsPage.checkRadio('No')
  await currentOffenceDetailsPage.clickButton('Save and continue')
}

async function completeCurrentOffencesPage(page: Page, name: string) {
  const currentOffenceDetailsPage = await ApplyPage.initialize(page, `Current offences for ${name}`)
  await currentOffenceDetailsPage.clickButton('Save and continue')
}

export const completeOffenceHistoryTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add offending history')

  await completeAnyPreviousConvictionsPage(page, name)
}

async function completeAnyPreviousConvictionsPage(page: Page, name: string) {
  const anyPreviousConvictionsPage = await ApplyPage.initialize(
    page,
    `Does ${name} have any previous unspent convictions?`,
  )
  await anyPreviousConvictionsPage.checkRadio('No, they do not have any previous unspent convictions')
  await anyPreviousConvictionsPage.clickSave()
}

export const completeCPPDetailsAndHDCLicenceConditionsTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add CPP details and HDC licence conditions')

  await completeCPPDetailsPage(page, name)
  await completeNonStandardLicenceConditionsPage(page, name)
}

async function completeCPPDetailsPage(page: Page, name: string) {
  const cppDetailsPage = await ApplyPage.initialize(page, `Who is ${name}'s Community Probation Practitioner (CPP)?`)
  await cppDetailsPage.fillField('Full name', 'A. CPP')
  await cppDetailsPage.fillField('Probation region', 'south')
  await cppDetailsPage.fillField('Contact email address', 'an@email.gov.uk')
  await cppDetailsPage.fillField('Contact number', '12345')
  await cppDetailsPage.clickSave()
}

async function completeNonStandardLicenceConditionsPage(page: Page, name: string) {
  const nonStandardLicenceConditionsPage = await ApplyPage.initialize(
    page,
    `Does ${name} have any non-standard licence conditions?`,
  )
  await nonStandardLicenceConditionsPage.checkRadio("I don't know")
  await nonStandardLicenceConditionsPage.clickSave()
}
