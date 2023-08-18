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

  hasIntroduceYourselfTemplate = (): void => {
    cy.get('span').contains('Introduce yourself to a team/officer')
    cy.get('p').contains('My name is {Name}, a {Role} working at the {Location}.')
  }

  hasHealthQuestionsTemplate = (): void => {
    cy.get('span').contains("Ask questions about the applicant's health")
    cy.get('li').contains('Do they have any physical health needs? Please describe them and the level of severity.')
  }

  hasDrugAndAlcoholQuestionsTemplate = (): void => {
    cy.get('span').contains("Ask questions about the applicant's drug and alcohol needs")
    cy.get('p').contains('The applicant has indicated that they are engaged with support for a drug or alcohol need.')
  }
}
