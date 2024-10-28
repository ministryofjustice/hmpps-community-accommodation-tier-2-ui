import { Page } from '@playwright/test'
import { ApplyPage, TaskListPage } from '../pages/apply'

export const completeFundingInformationTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Confirm funding and ID')

  const fundingInformationPage = await ApplyPage.initialize(
    page,
    `How will ${name} pay for their accommodation and service charge?`,
  )
  await fundingInformationPage.checkRadio('Personal money or wages', true)
  await fundingInformationPage.clickSave()
  await completeNationalInsurancePage(page, name)
}

async function completeNationalInsurancePage(page: Page, name: string) {
  const willAnswerEqualityQuestionsPage = await ApplyPage.initialize(
    page,
    `What is ${name}'s National Insurance number? (Optional)`,
  )
  await willAnswerEqualityQuestionsPage.clickSave()
}

export const completeAreaInformationTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add exclusion zones and preferred areas')

  await completeFirstAreaInformationPage(page, name)
  await completeSecondAreaInformationPage(page, name)
  await completeExclusionZonesPage(page, name)
  await completeGangAffiliations(page, name)
  await completeFamilyAccommodationPage(page, name)
}

async function completeFirstAreaInformationPage(page: Page, name: string) {
  const firstAreaInformationPage = await ApplyPage.initialize(page, `First preferred area for ${name}`)

  await firstAreaInformationPage.fillField('First preferred area', 'London')
  await firstAreaInformationPage.fillField('Reason for first preference', 'Family')

  await firstAreaInformationPage.clickSave()
}

async function completeSecondAreaInformationPage(page: Page, name: string) {
  const secondAreaInformationPage = await ApplyPage.initialize(page, `Second preferred area for ${name}`)

  await secondAreaInformationPage.fillField('Second preferred area', 'Birmingham')
  await secondAreaInformationPage.fillField('Reason for second preference', 'Job')

  await secondAreaInformationPage.clickSave()
}

async function completeExclusionZonesPage(page: Page, name: string) {
  const exclusionZonesPage = await ApplyPage.initialize(page, `Exclusion zones for ${name}`)

  await exclusionZonesPage.checkRadio('Yes')
  await exclusionZonesPage.fillField(
    'Provide the required safeguarding details about the exclusion zone',
    'Avoid Liverpool',
  )

  await exclusionZonesPage.clickSave()
}

async function completeGangAffiliations(page: Page, name: string) {
  const exclusionZonesPage = await ApplyPage.initialize(page, `Does ${name} have any gang affiliations?`)

  await exclusionZonesPage.checkRadio('Yes')
  await exclusionZonesPage.fillField('What is the name of the gang?', 'Gang name')
  await exclusionZonesPage.fillField('Where do they operate?', 'Derby')
  await exclusionZonesPage.fillField(
    'Name any known rival gangs and where they operate (optional)',
    'Rival gang detail',
  )

  await exclusionZonesPage.clickSave()
}

async function completeFamilyAccommodationPage(page: Page, name: string) {
  const familyAccommodationPage = await ApplyPage.initialize(page, `Family accommodation for ${name}`)

  await familyAccommodationPage.checkRadio('Yes')

  await familyAccommodationPage.clickSave()
}
