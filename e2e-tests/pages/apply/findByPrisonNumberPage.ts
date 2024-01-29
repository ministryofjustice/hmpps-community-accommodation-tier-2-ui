import { BasePage } from '../basePage'

export class FindByPrisonNumberPage extends BasePage {
  async enterPrisonNumber(prisonNumber: string) {
    await this.page.getByLabel("Enter the person's Prison Number").fill(prisonNumber)
  }
}
