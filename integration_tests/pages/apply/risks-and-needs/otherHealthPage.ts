import { Cas2Application as Application } from '../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../applyPage'
import paths from '../../../../server/paths/apply'

export default class OtherHealthPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(`Other health needs for ${application.person.name}`, application, 'health-needs', 'other-health')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'health-needs',
        page: 'other-health',
      }),
    )
  }
}
