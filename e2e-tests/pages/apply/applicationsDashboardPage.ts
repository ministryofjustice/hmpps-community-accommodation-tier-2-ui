import { BasePage } from '../basePage'

export class ApplicationsDashboardPage extends BasePage {
  async startNewApplication() {
    await this.page.getByRole('link', { name: 'Start a new application' }).click()
  }
}
