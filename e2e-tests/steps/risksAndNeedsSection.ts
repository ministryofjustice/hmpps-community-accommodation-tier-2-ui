import { Page } from '@playwright/test'
import { ApplyPage, TaskListPage } from '../pages/apply'

export const completeHealthNeedsTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add health needs')

  await reviewGuidancePage(page, name)
  await completeSubstanceMisusePage(page, name)
  await completePhysicalHealthPage(page, name)
  await completeMentalHealthPage(page, name)
  await completeCommunicationAndLanguagePage(page, name)
  await completeLearningDifficultiesPage(page, name)
  await completeBrainInjuryPage(page, name)
  await completeOtherHealthPage(page, name)
}

async function reviewGuidancePage(page: Page, name: string) {
  const guidancePage = await ApplyPage.initialize(page, `Request health information for ${name}`)
  await guidancePage.clickContinue()
}

async function completeSubstanceMisusePage(page: Page, name: string) {
  const substanceMisusePage = await ApplyPage.initialize(page, `Substance misuse needs for ${name}`)

  await substanceMisusePage.checkRadioInGroup('take any illegal substances', 'No')
  await substanceMisusePage.checkRadioInGroup('past issues with substance misuse', 'No')
  await substanceMisusePage.checkRadioInGroup('drug and alcohol service in custody', 'No')
  await substanceMisusePage.checkRadioInGroup('drug and alcohol service when they are released', 'No')
  await substanceMisusePage.checkRadioInGroup('substitute medication', 'No')
  await substanceMisusePage.checkRadioInGroup('naloxone', 'No')

  await substanceMisusePage.clickSave()
}

async function completePhysicalHealthPage(page: Page, name: string) {
  const physicalHealthPage = await ApplyPage.initialize(page, `Physical health needs for ${name}`)

  // we can't use the normal checkRadioInGroup() helper due to follow-on yes/no radios
  // triggering Error: strict mode violation
  await page.getByRole('group', { name: 'Do they have any physical health needs?' }).locator('label').nth(4).click()
  await physicalHealthPage.checkRadioInGroup('receiving any medication', 'No')
  await physicalHealthPage.checkRadioInGroup('live independently', 'Yes')
  await physicalHealthPage.checkRadioInGroup('additional support', 'No')

  await physicalHealthPage.clickSave()
}

async function completeMentalHealthPage(page: Page, name: string) {
  const mentalHealthPage = await ApplyPage.initialize(page, `Mental health needs for ${name}`)

  await mentalHealthPage.checkRadioInGroup('any mental health needs', 'No')
  await mentalHealthPage.checkRadioInGroup('mental health services before custody', 'No')
  await mentalHealthPage.checkRadioInGroup('mental health services in custody', 'No')
  await mentalHealthPage.checkRadioInGroup('mental health services after custody', 'No')
  await mentalHealthPage.checkRadioInGroup(
    'mental health medication',
    'They are not prescribed medication for their mental health',
  )

  await mentalHealthPage.clickSave()
}

async function completeCommunicationAndLanguagePage(page: Page, name: string) {
  const communicationPage = await ApplyPage.initialize(page, `Communication and language needs for ${name}`)

  await communicationPage.checkRadioInGroup('interpreter', 'No')
  await communicationPage.checkRadioInGroup('need any support', 'No')

  await communicationPage.clickSave()
}

async function completeLearningDifficultiesPage(page: Page, name: string) {
  const learningPage = await ApplyPage.initialize(page, `Learning difficulties and neurodiversity for ${name}`)

  await learningPage.checkRadioInGroup('additional needs', 'No')
  await learningPage.checkRadioInGroup('vulnerable', 'No')
  await learningPage.checkRadioInGroup('difficulties interacting', 'No')
  await learningPage.checkRadioInGroup('additional support', 'No')

  await learningPage.clickSave()
}

async function completeBrainInjuryPage(page: Page, name: string) {
  const brainInjuryPage = await ApplyPage.initialize(page, `Brain injury needs for ${name}`)

  await brainInjuryPage.checkRadioInGroup('brain injury?', 'No')
  await brainInjuryPage.checkRadioInGroup('vulnerable', 'No')
  await brainInjuryPage.checkRadioInGroup('difficulties interacting', 'No')
  await brainInjuryPage.checkRadioInGroup('additional support', 'No')

  await brainInjuryPage.clickSave()
}

async function completeOtherHealthPage(page: Page, name: string) {
  const otherHealthPage = await ApplyPage.initialize(page, `Other health needs for ${name}`)

  // we can't use the normal checkRadioInGroup() helper due to follow-on yes/no radios
  // triggering Error: strict mode violation
  await page.locator('css=input[name="hasLongTermHealthCondition"][value="no"]').click()

  await otherHealthPage.checkRadioInGroup('seizures', 'No')
  await otherHealthPage.checkRadioInGroup('treatment for cancer', 'No')

  await otherHealthPage.clickSave()
}

export const completeRiskToSelfTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add risk to self information')

  await reviewOasysImportPage(page, name)
  await completeVulnerabilityPage(page, name)
  await completeCurrentRisksPage(page, name)
  await completeHistoricalRisksPage(page, name)
  await addAnAcct(page)
  await completeAdditionalInformationPage(page, name)
}

export const enterOldRiskToSelfOasysDate = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add risk to self information')

  await reviewOasysImportPage(page, name)
  await completeOldOasysPage(page, name)
  await returnToTaskList(page)
}

async function reviewOasysImportPage(page: Page, name: string) {
  const guidancePage = await ApplyPage.initialize(page, `Import ${name}'s risk to self data from OASys`)
  await guidancePage.clickContinue()
}

async function completeOldOasysPage(page: Page, name: string) {
  const oldOasysPage = await ApplyPage.initialize(
    page,
    `Does ${name} have an older OASys with risk to self information? `,
  )
  await oldOasysPage.checkRadio('No')
  await oldOasysPage.clickContinue()
}

async function confirmAndSave(page: TaskListPage | ApplyPage) {
  await page.checkCheckboxes(['I confirm this information is relevant and up to date.'])
  await page.clickSave()
}

async function completeVulnerabilityPage(page: Page, name: string) {
  const vulnerabilityPage = await ApplyPage.initialize(page, `${name}'s vulnerability`)

  await vulnerabilityPage.fillField(
    `Describe ${name}'s current circumstances, issues and needs related to vulnerability`,
    'some vulnerability',
  )
  await confirmAndSave(vulnerabilityPage)
}

async function completeCurrentRisksPage(page: Page, name: string) {
  const currentRisksPage = await ApplyPage.initialize(page, `${name}'s current risks`)

  await currentRisksPage.fillField(
    `Describe ${name}'s current issues and needs related to self harm and suicide`,
    'some needs',
  )
  await confirmAndSave(currentRisksPage)
}

async function completeHistoricalRisksPage(page: Page, name: string) {
  const historicalRisksPage = await ApplyPage.initialize(page, `${name}'s historical risks`)

  await historicalRisksPage.fillField(
    `Describe ${name}'s historical issues and needs related to self harm and suicide`,
    'some needs',
  )
  await confirmAndSave(historicalRisksPage)
}

async function addAnAcct(page: Page) {
  const acctsPage = await ApplyPage.initialize(page, undefined)
  await acctsPage.clickButton('Add an Acct note')
  await completeAcctDataPage(page)
  await acctsPage.clickSave()
}

async function completeAcctDataPage(page: Page) {
  const acctDataPage = await ApplyPage.initialize(page, 'Add an ACCT entry')
  await acctDataPage.fillDateFieldInGroup('When was the ACCT created?', { year: '2022', month: '3', day: '1' })
  await acctDataPage.checkRadio('Yes')
  await acctDataPage.fillField('Referring institution', 'HMPPS Sheffield')
  await acctDataPage.fillField('Details about the ACCT', 'some details')
  await acctDataPage.clickButton('Save and add ACCT')
}

async function completeAdditionalInformationPage(page: Page, name: string) {
  const additionalInformationPage = await ApplyPage.initialize(
    page,
    `Is there anything else to include about ${name}'s risk to self?`,
  )
  await additionalInformationPage.checkRadio('No')
  await additionalInformationPage.clickSave()
}

export const completeRoshTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add risk of serious harm (RoSH) information')

  await reviewRoshOasysImportPage(page, name)
  await completeRoshSummaryPage(page, name)
  await completeRiskToOthersPage(page)
  await completeRiskManagementArrangementsPage(page, name)
  await completeCellShareInformationPage(page, name)
  await completeAdditionalRiskPage(page, name)
}

export const enterOldRoshOasysDate = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add risk of serious harm (RoSH) information')

  await reviewRoshOasysImportPage(page, name)
  await completeOldOasysRoshPage(page, name)
  await returnToTaskList(page)
}

async function completeOldOasysRoshPage(page: Page, name: string) {
  const oldOasysPage = await ApplyPage.initialize(
    page,
    `Does ${name} have an older OASys with risk of serious harm (RoSH) information? `,
  )
  await oldOasysPage.checkRadio('No')
  await oldOasysPage.clickContinue()
}

async function returnToTaskList(page: Page) {
  const applyPage = new TaskListPage(page)
  await applyPage.clickLink('Back to task list')
}

async function reviewRoshOasysImportPage(page: Page, name: string) {
  const guidancePage = await ApplyPage.initialize(page, `Import ${name}'s risk of serious harm (RoSH) data from OASys`)
  await guidancePage.clickContinue()
}

async function completeRoshSummaryPage(page: Page, name: string) {
  const summaryPage = await ApplyPage.initialize(page, `Risk of serious harm (RoSH) summary for ${name}`)
  await summaryPage.clickSave()
}

async function completeRiskToOthersPage(page: Page) {
  const riskToOthersPage = new TaskListPage(page)
  await confirmAndSave(riskToOthersPage)
}

async function completeRiskManagementArrangementsPage(page: Page, name: string) {
  const riskManagementPage = await ApplyPage.initialize(page, `Risk management arrangements for ${name}`)
  await riskManagementPage.checkCheckboxes(['No, this person does not have risk management arrangements'])
  await riskManagementPage.clickSave()
}

async function completeCellShareInformationPage(page: Page, name: string) {
  const riskManagementPage = await ApplyPage.initialize(page, `Cell share information for ${name}`)
  await riskManagementPage.checkRadio('No')
  await riskManagementPage.clickSave()
}

async function completeAdditionalRiskPage(page: Page, name: string) {
  const riskManagementPage = await ApplyPage.initialize(page, `Additional risk information for ${name}`)
  await riskManagementPage.checkRadio('No')
  await riskManagementPage.clickSave()
}
