import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import ApplyPage from './applyPage'

export default class ConfirmEligibilityPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Is ${application.person.name} eligible for Short-Term Accommodation (CAS-2)`,
      application,
      'confirm-eligibility',
      'confirm-eligibility',
    )
  }

  hasCaption = (): void => {
    cy.get('p').contains(
      `Check ${this.application.person.name} meets the requirements for Short-Term Accommodation (CAS-2)`,
    )
  }

  hasQuestionsAndAnswers = (): void => {
    cy.get('label').contains(`Yes, I confirm ${this.application.person.name} is eligible`)
    cy.get('label').contains(`No, ${this.application.person.name} is not eligible`)
  }

  hasGuidance = (): void => {
    cy.get('.govuk-inset-text').within(() => {
      cy.get('p').contains('The applicant must:')
      cy.get('li').contains('be 18 years old or older')
    })
  }

  chooseYesOption = (): void => {
    this.checkRadioByNameAndValue('isEligible', 'yes')
  }

  chooseNoOption = (): void => {
    this.checkRadioByNameAndValue('isEligible', 'no')
  }
}
