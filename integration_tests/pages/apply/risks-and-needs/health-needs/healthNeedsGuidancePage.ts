import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'

export default class HealthNeedsGuidancePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Request health information for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'health-needs',
      'guidance',
    )
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
    cy.get('p').contains('My name is {Name}, a {Role} working at HMP {prison name}.')
  }

  copyIntroduceYourselfTemplateToClipboard = (): void => {
    cy.get('span').contains('Introduce yourself to a team/officer').click()
    cy.get('#introduce-yourself-button').click()
    cy.assertValueCopiedToClipboardContains('My name is {Name}, a {Role} working at HMP {prison name}.')
  }

  hasHealthQuestionsTemplate = (): void => {
    cy.get('span').contains("Ask questions about the applicant's health")
    cy.get('li').contains('Do they have any physical health needs? Please describe them and the level of severity.')
  }

  copyHealthQuestionsTemplateToClipboard = (): void => {
    cy.get('span').contains("Ask questions about the applicant's health").click()
    cy.get('#health-questions-button').click()
    cy.assertValueCopiedToClipboardContains(
      'Do they have any physical health needs? Please describe them and the level of severity.',
    )
  }

  hasDrugAndAlcoholQuestionsTemplate = (): void => {
    cy.get('span').contains("Ask questions about the applicant's drug and alcohol needs")
    cy.get('p').contains('The applicant has indicated that they are engaged with support for a drug or alcohol need.')
  }

  copyDrugAndAlcoholTemplateToClipboard = (): void => {
    cy.get('span').contains("Ask questions about the applicant's drug and alcohol needs").click()
    cy.get('#drug-alcohol-questions-button').click()
    cy.assertValueCopiedToClipboardContains(
      'The applicant has indicated that they are engaged with support for a drug or alcohol need.',
    )
  }
}
