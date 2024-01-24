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

async function reviewGuidancePage(page: Page, name) {
  const guidancePage = await ApplyPage.initialize(page, `Request health information for ${name}`)
  await guidancePage.clickContinue()
}

async function completeSubstanceMisusePage(page: Page, name) {
  const substanceMisusePage = await ApplyPage.initialize(page, `Substance misuse needs for ${name}`)

  await substanceMisusePage.checkRadioInGroup('take any illegal substances', 'No')
  await substanceMisusePage.checkRadioInGroup('past issues with substance misuse', 'No')
  await substanceMisusePage.checkRadioInGroup('drug and alcohol service in custody', 'No')
  await substanceMisusePage.checkRadioInGroup('drug and alcohol service when they are released', 'No')
  await substanceMisusePage.checkRadioInGroup('substitute medication', 'No')
  await substanceMisusePage.checkRadioInGroup('naloxone', 'No')

  await substanceMisusePage.clickSave()
}

async function completePhysicalHealthPage(page: Page, name) {
  const physicalHealthPage = await ApplyPage.initialize(page, `Physical health needs for ${name}`)

  // we can't use the normal checkRadioInGroup() helper due to follow-on yes/no radios
  // triggering Error: strict mode violation
  await page.getByRole('group', { name: 'Do they have any physical health needs?' }).locator('label').nth(4).click()
  await physicalHealthPage.checkRadioInGroup('receiving any medical treatment', 'No')
  await physicalHealthPage.checkRadioInGroup('receiving any medication', 'No')
  await physicalHealthPage.checkRadioInGroup('live independently', 'Yes')
  await physicalHealthPage.checkRadioInGroup('additional support', 'No')

  await physicalHealthPage.clickSave()
}

async function completeMentalHealthPage(page: Page, name) {
  const mentalHealthPage = await ApplyPage.initialize(page, `Mental health needs for ${name}`)

  await mentalHealthPage.checkRadioInGroup('any mental health needs', 'No')
  await mentalHealthPage.checkRadioInGroup('community mental health services', 'No')
  await mentalHealthPage.checkRadioInGroup('mental health services in custody', 'No')
  await mentalHealthPage.checkRadioInGroup(
    'mental health medication',
    'They are not prescribed medication for their mental health',
  )

  await mentalHealthPage.clickSave()
}

async function completeCommunicationAndLanguagePage(page: Page, name) {
  const communicationPage = await ApplyPage.initialize(page, `Communication and language needs for ${name}`)

  await communicationPage.checkRadioInGroup('additional communication needs', 'No')
  await communicationPage.checkRadioInGroup('interpreter', 'No')
  await communicationPage.checkRadioInGroup('need any support', 'No')

  await communicationPage.clickSave()
}

async function completeLearningDifficultiesPage(page: Page, name) {
  const learningPage = await ApplyPage.initialize(page, `Learning difficulties and neurodiversity for ${name}`)

  await learningPage.checkRadioInGroup('additional needs', 'No')
  await learningPage.checkRadioInGroup('vulnerable', 'No')
  await learningPage.checkRadioInGroup('difficulties interacting', 'No')
  await learningPage.checkRadioInGroup('additional support', 'No')

  await learningPage.clickSave()
}

async function completeBrainInjuryPage(page: Page, name) {
  const brainInjuryPage = await ApplyPage.initialize(page, `Brain injury needs for ${name}`)

  await brainInjuryPage.checkRadioInGroup('brain injury?', 'No')
  await brainInjuryPage.checkRadioInGroup('vulnerable', 'No')
  await brainInjuryPage.checkRadioInGroup('difficulties interacting', 'No')
  await brainInjuryPage.checkRadioInGroup('additional support', 'No')

  await brainInjuryPage.clickSave()
}

async function completeOtherHealthPage(page: Page, name) {
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
  await completeAdditionalInformationPage(page)
}

async function reviewOasysImportPage(page: Page, name) {
  const guidancePage = await ApplyPage.initialize(page, `Import ${name}'s risk to self data from OASys`)
  await guidancePage.clickContinue()
}

async function confirmAndSave(page) {
  await page.checkCheckboxes(['I confirm this information is relevant and up to date.'])
  await page.clickSave()
}

async function completeVulnerabilityPage(page, name) {
  const vulnerabilityPage = await ApplyPage.initialize(page, `${name}'s vulnerability`)

  await vulnerabilityPage.fillField(
    `Describe ${name}'s current circumstances, issues and needs related to vulnerability`,
    'some vulnerability',
  )
  await confirmAndSave(vulnerabilityPage)
}

async function completeCurrentRisksPage(page, name) {
  const currentRisksPage = await ApplyPage.initialize(page, `${name}'s current risks`)

  await currentRisksPage.fillField(
    `Describe ${name}'s current issues and needs related to self harm and suicide`,
    'some needs',
  )
  await confirmAndSave(currentRisksPage)
}

async function completeHistoricalRisksPage(page, name) {
  const historicalRisksPage = await ApplyPage.initialize(page, `${name}'s historical risks`)
  await confirmAndSave(historicalRisksPage)
}

async function addAnAcct(page) {
  const acctsPage = await ApplyPage.initialize(page, undefined)
  await acctsPage.clickButton('Add an Acct note')
  await completeAcctDataPage(page)
  await acctsPage.clickSave()
}

async function completeAcctDataPage(page) {
  const acctDataPage = await ApplyPage.initialize(page, 'Add an ACCT entry')
  await acctDataPage.fillDateFieldInGroup('When was the ACCT created?', { year: '2022', month: '3', day: '1' })
  await acctDataPage.checkRadio('Yes')
  await acctDataPage.fillField('Referring institution', 'HMPPS Sheffield')
  await acctDataPage.fillField('Details about the ACCT', 'some details')
  await acctDataPage.clickButton('Save and add ACCT')
}

async function completeAdditionalInformationPage(page) {
  const additionalInformationPage = await ApplyPage.initialize(page, 'Additional Information')
  await additionalInformationPage.checkRadio('No')
  await additionalInformationPage.clickSave()
}

export const completeRoshTask = async (page: Page, name: string) => {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickTask('Add risk of serious harm (RoSH) information')

  await reviewRoshOasysImportPage(page, name)
  await completeRoshSummaryPage(page, name)
  await completeRiskToOthersPage(page)
  await completeRiskFactorsPage(page)
  await completeReducingRiskPage(page)
  await completeRiskManagementArrangementsPage(page, name)
  await completeCellShareInformationPage(page, name)
  await completeBehaviourNotesPage(page)
  await completeAdditionalRiskPage(page, name)
}

async function reviewRoshOasysImportPage(page: Page, name) {
  const guidancePage = await ApplyPage.initialize(page, `Import ${name}'s risk of serious harm (RoSH) data from OASys`)
  await guidancePage.clickContinue()
}

async function completeRoshSummaryPage(page, name) {
  const summaryPage = await ApplyPage.initialize(page, `Risk of serious harm (RoSH) summary for ${name}`)
  await summaryPage.clickSave()
}

async function completeRiskToOthersPage(page) {
  const riskToOthersPage = new TaskListPage(page)
  await confirmAndSave(riskToOthersPage)
}

async function completeRiskFactorsPage(page) {
  const riskFactorsPage = new TaskListPage(page)
  await confirmAndSave(riskFactorsPage)
}

async function completeReducingRiskPage(page) {
  const reducingRiskPage = new TaskListPage(page)
  await confirmAndSave(reducingRiskPage)
}

async function completeRiskManagementArrangementsPage(page, name) {
  const riskManagementPage = await ApplyPage.initialize(page, `Risk management arrangements for ${name}`)
  await riskManagementPage.checkCheckboxes(['No, this person does not have risk management arrangements'])
  await riskManagementPage.clickSave()
}

async function completeCellShareInformationPage(page, name) {
  const riskManagementPage = await ApplyPage.initialize(page, `Cell share information for ${name}`)
  await riskManagementPage.checkRadio('No')
  await riskManagementPage.clickSave()
}

async function completeBehaviourNotesPage(page) {
  const taskListPage = new TaskListPage(page)
  await taskListPage.clickSave()
}

async function completeAdditionalRiskPage(page, name) {
  const riskManagementPage = await ApplyPage.initialize(page, `Additional risk information for ${name}`)
  await riskManagementPage.checkRadio('No')
  await riskManagementPage.clickSave()
}
