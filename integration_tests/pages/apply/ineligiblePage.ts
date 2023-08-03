import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import Page from '../page'
import paths from '../../../server/paths/apply'

export default class IneligiblePagePage extends Page {
  constructor(private readonly application: Application) {
    super(`${application.person.name} is not eligible for CAS-2 accommodation`)
  }

  hasGuidance(): void {
    cy.contains('should refer them to the regional Commissioned Rehabilitative Services provider')
  }

  hasLinkToChangeAnswer(): void {
    cy.contains('Change eligibility answer').should(
      'have.attr',
      'href',
      paths.applications.pages.show({
        id: this.application.id,
        task: 'confirm-eligibility',
        page: 'confirm-eligibility',
      }),
    )
  }

  chooseToChangeAnswer(): void {
    cy.get('a').contains('Change eligibility answer').click()
  }
}
