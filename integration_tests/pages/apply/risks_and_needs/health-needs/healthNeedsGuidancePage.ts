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

    cy.get('button[data-target-id="introduce-yourself-template"]').contains('Copy text').click()
    cy.get('button[data-target-id="introduce-yourself-template"]').contains('Text is copied')
    cy.assertValueCopiedToClipboardContains('My name is {Name}, a {Role} working at HMP {prison name}.')
  }

  hasHealthQuestionsTemplate = (): void => {
    cy.get('span').contains("Ask questions about the applicant's physical health")
    cy.get('li').contains(
      'Do they have any physical health needs? For example, needing a mobility scooter, stair lift, wet room, grip rails in the shower or bath, or wider door frames and ramps. If yes, describe their physical health needs.',
    )
  }

  copyHealthQuestionsTemplateToClipboard = (): void => {
    cy.get('span').contains("Ask questions about the applicant's physical health").click()

    cy.get('button[data-target-id="health-questions-template"]').contains('Copy text').click()
    cy.get('button[data-target-id="health-questions-template"]').contains('Text is copied')
    cy.assertValueCopiedToClipboardContains(
      'Do they have any physical health needs? For example, needing a mobility scooter, stair lift, wet room, grip rails in the shower or bath, or wider door frames and ramps. If yes, describe their physical health needs.',
    )
  }

  hasMentalHealthQuestionsTemplate = (): void => {
    cy.get('span').contains("Ask questions about the applicant's mental health")
    cy.get('li').contains('Do they have any mental health needs?')
  }

  copyMentalHealthQuestionsTemplateToClipboard = (): void => {
    cy.get('span').contains("Ask questions about the applicant's mental health").click()
    cy.get('button[data-target-id="mental-health-questions-template"]').contains('Copy text').click()
    cy.get('button[data-target-id="mental-health-questions-template"]').contains('Text is copied')
    cy.assertValueCopiedToClipboardContains('Do they have any mental health needs?')
  }

  hasDrugAndAlcoholQuestionsTemplate = (): void => {
    cy.get('span').contains("Ask questions about the applicant's drug and alcohol needs")
    cy.get('p').contains('The applicant has indicated that they are engaged with support for a drug or alcohol need.')
  }

  copyDrugAndAlcoholTemplateToClipboard = (): void => {
    cy.get('span').contains("Ask questions about the applicant's drug and alcohol needs").click()
    cy.get('button[data-target-id="drug-alcohol-questions-template"]').contains('Copy text').click()
    cy.get('button[data-target-id="drug-alcohol-questions-template"]').contains('Text is copied')
    cy.assertValueCopiedToClipboardContains(
      'The applicant has indicated that they are engaged with support for a drug or alcohol need.',
    )
  }
}
