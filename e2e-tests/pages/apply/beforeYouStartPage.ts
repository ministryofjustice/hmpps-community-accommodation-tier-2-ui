import { BasePage } from '../basePage'

export class BeforeYouStartPage extends BasePage {
  async startNow() {
    await this.page.getByRole('button', { name: 'Start now' }).click()
  }
}
