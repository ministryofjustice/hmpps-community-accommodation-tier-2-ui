import { Cas2Application as Application } from '../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../applyPage'

export default class HealthNeedsGuidancePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(`Request health information for ${application.person.name}`, application, 'health-needs', 'guidance')
  }

  hasCaption = (): void => {
    cy.get('p').contains('To complete this section, you’ll need to enter health information about the applicant.')
  }

  hasGuidance = (): void => {
    cy.get('p').contains('Typically, this could involve speaking to the following people')
    cy.get('li').contains('Healthcare team')
  }
}
