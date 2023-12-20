import Page, { PageElement } from './page'

export default class DashboardPage extends Page {
  constructor() {
    const name = undefined
    super('CAS2: Short-term accommodation', name)
  }

  static visit(): DashboardPage {
    cy.visit('/')

    return new DashboardPage()
  }

  shouldShowSignOutButton(): void {
    cy.get('[data-qa="signOut"]').should('exist')
  }

  shouldShowCards(sections: Array<string>) {
    sections.forEach(section => cy.get(`[data-cy-card-section="${section}"]`).should('exist'))
  }

  shouldNotShowCards(sections: Array<string>) {
    sections.forEach(section => cy.get(`[data-cy-card-section="${section}"]`).should('not.exist'))
  }

  headerUserName = (): PageElement => cy.get('[data-qa=header-user-name]')
}
