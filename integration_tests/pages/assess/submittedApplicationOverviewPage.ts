import { Cas2SubmittedApplication as SubmittedApplication, FullPerson } from '@approved-premises/api'
import Page from '../page'

export default class SubmittedApplicationOverviewPage extends Page {
  constructor(private readonly application: SubmittedApplication) {
    const person = application.person as FullPerson
    super(person.name, person.name)
  }

  static visit(application: SubmittedApplication): SubmittedApplicationOverviewPage {
    cy.visit(`/assess/applications/${application.id}/overview`)
    return new SubmittedApplicationOverviewPage(application)
  }
}
