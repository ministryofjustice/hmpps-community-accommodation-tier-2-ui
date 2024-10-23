import { FullPerson } from '../../../server/@types/shared/models/FullPerson'
import { DateFormats } from '../../../server/utils/dateUtils'
import Page from '../page'

export default class ConfirmApplicantPage extends Page {
  personName: string

  constructor(name: string) {
    super(`Confirm ${name}'s details`, name)
  }

  hasErrorDetails = (): void => {
    cy.get('.govuk-error-summary').contains('There was an error creating the application, please try again')
  }

  hasApplicantInformation = (applicant: FullPerson): void => {
    const expectedApplicantData = [
      ['Full name', applicant.name],
      ['Date of birth', DateFormats.isoDateToUIDate(applicant.dateOfBirth, { format: 'short' })],
      ['Nationality', applicant.nationality],
      ['Sex', applicant.sex],
      ['Prison number', applicant.nomsNumber],
      ['Prison', applicant.prisonName],
      ['PNC number', applicant.pncNumber],
      ['CRN from NDelius', applicant.crn],
      ['Status', applicant.status === 'InCommunity' ? 'In Community' : 'In Custody'],
    ]
    cy.get('.govuk-summary-list').within(() => {
      cy.get('.govuk-summary-list__row').each(($el, index) => {
        cy.wrap($el).within(() => {
          cy.get('.govuk-summary-list__key').should('contain', expectedApplicantData[index][0])
          cy.get('.govuk-summary-list__value').should('contain', expectedApplicantData[index][1])
        })
      })
    })
  }
}
