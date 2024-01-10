import Page from '../page'
import paths from '../../../server/paths/report'

export default class ManagementInfoDownloadsPage extends Page {
  constructor() {
    super('Management information reports', undefined)
    this.pageHasMiTitle()
  }

  static visit(): ManagementInfoDownloadsPage {
    cy.visit(paths.report.new.pattern)

    return new ManagementInfoDownloadsPage()
  }

  pageHasMiTitle(): void {
    cy.title().should('include', 'Download reports')
  }

  shouldShowManagementInfoDownloads(): void {
    cy.contains('Download management information in spreadsheet format')
    cy.contains('Submitted applications').should(
      'have.attr',
      'href',
      paths.report.create({ name: 'submitted-applications' }),
    )
    cy.contains('Application status updates').should(
      'have.attr',
      'href',
      paths.report.create({ name: 'application-status-updates' }),
    )
  }
}
