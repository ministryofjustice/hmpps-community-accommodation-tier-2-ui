import { BasePage } from '../basePage'

export class DashboardPage extends BasePage {
  async goto() {
    await this.page.goto('/')
  }

  async makeNewApplication() {
    await this.page.getByText('Start a new application').click()
  }
}
