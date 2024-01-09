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
      'Community Accommodation Service Tier 2 provides housing for people who do not have a suitable address for the term of their licence or Bail Order.',
    )

    cy.get('h2').contains('Before you start')
    cy.get('h3').contains('Who is this for?')

    cy.get('li').contains('people without suitable accommodation in the community')
    cy.get('li').contains('people on Bail Order')
    cy.get('li').contains('people on a Home Detention Curfew (HDC) licence')
  }
}
