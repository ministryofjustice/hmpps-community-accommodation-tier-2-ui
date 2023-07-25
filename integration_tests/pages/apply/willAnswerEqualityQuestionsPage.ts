import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import ApplyPage from './applyPage'

export default class WillAnswerEqualityQuestionsPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Does ${application.person.name} want to answer the equality questions?`,
      application,
      'about-the-person',
      'will-answer-equality-questions',
    )
  }

  hasCaption = (): void => {
    cy.get('.govuk-caption-l').contains(`Equality and diversity questions for ${this.application.person.name}`)
  }

  hasQuestionsAndAnswers = (): void => {
    cy.get('label').contains('Yes, answer the equality questions (takes 2 minutes)')
    cy.get('label').contains('No, skip the equality questions')
  }

  isOptional = (): void => {
    cy.get('p').contains('These questions are optional.')
    cy.get('p').contains('The answers will not affect their application.')
  }

  hasRationale = (): void => {
    cy.get('.govuk-details').within(() => {
      cy.get('.govuk-details__summary-text').contains('Why we ask equality questions')
      cy.get('.govuk-details__text').contains('[INSERT RATIONALE]')
    })
  }
}
