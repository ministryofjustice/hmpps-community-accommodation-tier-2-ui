import { Cas2Application as Application } from '../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../applyPage'
import paths from '../../../../server/paths/apply'

export default class HealthNeedsGuidancePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(`Request health information for ${application.person.name}`, application, 'health-needs', 'guidance')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'health-needs',
        page: 'guidance',
      }),
    )
  }

  hasCaption = (): void => {
    cy.get('p').contains('To complete this section, you’ll need to enter health information about the applicant.')
  }

  hasGuidance = (): void => {
    cy.get('p').contains('Typically, this could involve speaking to the following people')
    cy.get('li').contains('Healthcare team')
  }
}
