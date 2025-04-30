import {
  Cas2SubmittedApplication,
  Cas2SubmittedApplication as SubmittedApplication,
  FullPerson,
} from '@approved-premises/api'
import Page from '../page'
import paths from '../../../server/paths/assess'
import {
  getApplicationSummaryData,
  TransferredApplicationSummary,
} from '../../../server/utils/applications/getApplicationSummaryData'

export default class SubmittedApplicationPage extends Page {
  constructor(private readonly application: SubmittedApplication) {
    const person = application.person as FullPerson
    super(`${person.name}'s application`, person.name)
  }

  static visit(application: SubmittedApplication): SubmittedApplicationPage {
    cy.visit(paths.submittedApplications.show({ id: application.id }))

    return new SubmittedApplicationPage(application)
  }

  hasExpectedSummaryData(): void {
    const person = this.application.person as FullPerson

    cy.get('#application-summary').within(() => {
      cy.get('span').contains(person.nomsNumber)
      cy.get('li').contains(this.application.allocatedPomName)
      cy.get('li').contains(this.application.allocatedPomEmailAddress)
      cy.get('li').contains(person.prisonName)
      cy.get('li').contains(this.application.telephoneNumber)
      cy.get('li').contains(this.application.id)
    })
  }

  hasExpectedSummaryDataForTransferredApplication(application: Cas2SubmittedApplication): void {
    const person = this.application.person as FullPerson
    const summary = getApplicationSummaryData('assessor', application) as TransferredApplicationSummary

    cy.get('#application-summary').within(() => {
      cy.get('span').contains(person.nomsNumber)
      cy.get('li').contains(summary.pomAllocationLabel)
      cy.get('li').contains(summary.pomAllocation)
      cy.get('li').contains(summary.contactEmail)
      cy.get('li').contains(summary.emailLabel)
      cy.get('li').contains(this.application.id)
    })
  }

  hasUpdateStatusButton(): void {
    cy.get('a').contains('Update application status')
  }
}
