import { ApplyPage, TaskListPage } from '../pages/apply'

export const completeCurrentOffencesTask = async (page, name) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add current offences')

  await completeCurrentOffenceDetailsPage(page, name)
  await completeCurrentOffencesPage(page, name)
}

async function completeCurrentOffenceDetailsPage(page, name) {
  const currentOffenceDetailsPage = await ApplyPage.initialize(page, `Add ${name}'s current offence details`)
  await currentOffenceDetailsPage.fillField('Offence title', 'Stalking')
  await currentOffenceDetailsPage.chooseSelectItem('Offence category', 'Stalking or Harassment')
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

async function completeCurrentOffencesPage(page, name) {
  const currentOffenceDetailsPage = await ApplyPage.initialize(page, `Current offences for ${name}`)
  await currentOffenceDetailsPage.clickButton('Save and continue')
}

export const completeOffenceHistoryTask = async (page, name) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add offending history')

  await completeAnyPreviousConvictionsPage(page, name)
}

async function completeAnyPreviousConvictionsPage(page, name) {
  const anyPreviousConvictionsPage = await ApplyPage.initialize(page, `Does ${name} have any previous convictions?`)
  await anyPreviousConvictionsPage.checkRadio('No')
  await anyPreviousConvictionsPage.clickSave()
}

export const completeHDCLicenceAndCPPDetailsTask = async (page, name) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add HDC licence and CPP details')

  await completeHDCLicenceDatesPage(page, name)
  await completeCPPDetailsPage(page, name)
  await completeNonStandardLicenceConditionsPage(page, name)
}

async function completeHDCLicenceDatesPage(page, name) {
  const hdcLicenceDatesPage = await ApplyPage.initialize(page, `${name}'s Home Detention Curfew (HDC) licence dates`)
  await hdcLicenceDatesPage.fillDateFieldInGroup(`What is ${name}'s HDC eligibility date?`, {
    year: '2022',
    month: '3',
    day: '1',
  })
  await hdcLicenceDatesPage.fillDateFieldInGroup(`What is ${name}'s conditional release date?`, {
    year: '2023',
    month: '3',
    day: '1',
  })
  await hdcLicenceDatesPage.clickSave()
}

async function completeCPPDetailsPage(page, name) {
  const cppDetailsPage = await ApplyPage.initialize(page, `Who is ${name}'s Community Probation Practitioner (CPP)?`)
  await cppDetailsPage.fillField('Full name', 'A. CPP')
  await cppDetailsPage.fillField('Probation region', 'south')
  await cppDetailsPage.fillField('Contact email address', 'an@email.gov.uk')
  await cppDetailsPage.fillField('Contact number', '12345')
  await cppDetailsPage.clickSave()
}

async function completeNonStandardLicenceConditionsPage(page, name) {
  const nonStandardLicenceConditionsPage = await ApplyPage.initialize(
    page,
    `Does ${name} have any non-standard licence conditions?`,
  )
  await nonStandardLicenceConditionsPage.checkRadio("I don't know")
  await nonStandardLicenceConditionsPage.clickSave()
}
