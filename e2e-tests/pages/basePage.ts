import { Page } from '@playwright/test'

export class BasePage {
  constructor(public readonly page: Page) {
    // noop
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save and continue' }).click()
  }

  async clickSubmit() {
    await this.page.getByRole('button', { name: 'Submit' }).click()
  }

  async clickContinue() {
    await this.page.getByRole('button', { name: 'Continue' }).click()
  }

  async clickButton(name: string) {
    await this.page.getByRole('button', { name }).click()
  }

  async clickLink(name: string) {
    await this.page.getByRole('link', { name }).click()
  }

  async fillField(label: string, value: string) {
    await this.page.getByLabel(label, { exact: true }).fill(value)
  }

  async fillFieldByGroupAndLabel(group: string, label: string, value: string) {
    await this.page.getByRole('group', { name: group }).getByLabel(label).fill(value)
  }

  async checkRadio(label: string, beExact = false) {
    await this.page.getByLabel(label, { exact: beExact }).check()
  }

  async checkRadioByTestId(testId: string) {
    await this.page.getByTestId(testId).check()
  }

  async checkRadioInGroup(group: string, label: string) {
    await this.page
      .getByRole('group', {
        name: group,
      })
      .getByLabel(label, { exact: true })
      .check()
  }

  async checkCheckboxes(labels: Array<string>) {
    const promises = [] as Array<Promise<void>>

    labels.forEach(label => promises.push(this.page.getByLabel(label).dispatchEvent('click')))

    await Promise.all(promises)
  }

  async fillDateField({ year, month, day }: { year: string; month: string; day: string }) {
    await this.page.getByLabel('Day', { exact: true }).fill(day)
    await this.page.getByLabel('Month', { exact: true }).fill(month)
    await this.page.getByLabel('Year', { exact: true }).fill(year)
  }

  async fillDateFieldInGroup(group: string, date: { day: string; month: string; year: string }) {
    await this.page.getByRole('group', { name: group }).getByLabel('Day').fill(date.day)
    await this.page.getByRole('group', { name: group }).getByLabel('Month').fill(date.month)
    await this.page.getByRole('group', { name: group }).getByLabel('Year').fill(date.year)
  }

  async chooseSelectItemByTestId(testId: string, option: string) {
    await this.page.getByTestId(testId).selectOption({ label: option })
  }

  async chooseSelectItem(label: string, option: string) {
    await this.page.getByLabel(label).selectOption({ label: option })
  }
}
