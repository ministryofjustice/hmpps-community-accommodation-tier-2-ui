import paths from '../../../server/paths/apply'
import Page from '../page'

export default class BeforeYouStartPage extends Page {
  constructor(name: string) {
    super('Apply for Short-Term Accommodation (CAS-2)', name)
  }

  static visit(name: string): BeforeYouStartPage {
    cy.visit(paths.applications.beforeYouStart({}))

    return new BeforeYouStartPage(name)
  }

  shouldShowApplicationGuidance(): void {
    cy.get('p').contains(
      'Use this service to apply for accommodation and support on behalf of someone on Home Detention Curfew (HDC) licence.',
    )

    cy.get('h2').contains('Before you start')
    cy.get('h3').contains('You need:')

    cy.get('li').contains('consent from the applicant')
  }
}
