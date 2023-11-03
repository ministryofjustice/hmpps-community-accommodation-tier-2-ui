import { Cas2SubmittedApplication as SubmittedApplication, FullPerson } from '@approved-premises/api'
import Page from '../page'
import { DateFormats } from '../../../server/utils/dateUtils'

export default class SubmittedApplicationOverviewPage extends Page {
  constructor(private readonly application: SubmittedApplication) {
    const person = application.person as FullPerson
    super(person.name, person.name)
  }

  shouldShowApplicationSummaryDetails(application: SubmittedApplication): void {
    const person = application.person as FullPerson
    cy.get('h1').contains(person.name)
    cy.get('p').contains(
      `This application was submitted on ${DateFormats.isoDateToUIDate(application.submittedAt, {
        format: 'medium',
      })}.`,
    )
  }

  static visit(application: SubmittedApplication): SubmittedApplicationOverviewPage {
    cy.visit(`/assess/applications/${application.id}/overview`)
    return new SubmittedApplicationOverviewPage(application)
  }
}
