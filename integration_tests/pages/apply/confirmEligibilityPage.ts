import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import { nameOrPlaceholderCopy } from '../../../server/utils/utils'
import ApplyPage from './applyPage'

export default class ConfirmEligibilityPage extends ApplyPage {
  personName: string

  constructor(private readonly application: Application) {
    super(
      `Is ${nameOrPlaceholderCopy(application.person)} eligible for Short-Term Accommodation (CAS-2)`,
      application,
      'confirm-eligibility',
      'confirm-eligibility',
    )
    this.personName = nameOrPlaceholderCopy(application.person)
  }

  hasCaption = (): void => {
    cy.get('p').contains(`Check ${this.personName} meets the requirements for Short-Term Accommodation (CAS-2).`)
  }

  hasQuestionsAndAnswers = (): void => {
    cy.get('label').contains(`Yes, I confirm ${this.personName} is eligible`)
    cy.get('label').contains(`No, ${this.personName} is not eligible`)
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
