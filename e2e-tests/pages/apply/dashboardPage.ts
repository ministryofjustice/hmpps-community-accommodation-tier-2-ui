import { BasePage } from '../basePage'

export class DashboardPage extends BasePage {
  async goto() {
    await this.page.goto('/')
  }

  async makeNewReferral() {
    await this.page.getByText('New referral').click()
  }
}
