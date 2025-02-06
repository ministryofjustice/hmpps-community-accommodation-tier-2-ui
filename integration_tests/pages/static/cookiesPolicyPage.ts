import Page from '../page'

export default class CookiesPolicyPage extends Page {
  constructor() {
    super('Cookies', undefined)
  }

  static visit(): CookiesPolicyPage {
    cy.visit('/cookies')

    return new CookiesPolicyPage()
  }

  shouldShowCookiePolicy(): void {
    cy.get('h1').contains('Cookies')
    cy.get('p').contains('Cookies are small files saved on your phone, tablet or computer when you visit a website.')
    cy.get('p').contains('We use cookies to make Short-Term Accommodation (CAS-2) work.')
    cy.get('h2').contains('Essential cookies')
    cy.get('p').contains(
      'Essential cookies keep your information secure while you use Short-Term Accommodation (CAS-2). We do not need to ask permission to use them.',
    )
    ;['Name', 'Purpose', 'Expires'].forEach(heading => {
      cy.get('table th').contains(heading)
    })
    ;['connect.sid', 'Keeps you logged into the service', '2 hours'].forEach(cell => {
      cy.get('table td').contains(cell)
    })
  }
}
