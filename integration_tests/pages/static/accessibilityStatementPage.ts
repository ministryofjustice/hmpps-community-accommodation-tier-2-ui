import Page from '../page'

export default class AccessibilityStatementPage extends Page {
  constructor() {
    super('Accessibility statement', undefined)
  }

  static visit(): AccessibilityStatementPage {
    cy.visit('/accessibility-statement')

    return new AccessibilityStatementPage()
  }

  shouldShowAccessibilityStatement(): void {
    cy.get('h1').contains('Accessibility statement')
    cy.get('p').contains(
      'This accessibility statement applies to the CAS2 for HDC service, available at https://short-term-accommodation-cas-2.hmpps.service.justice.gov.uk.',
    )
    cy.get('p').contains('This website is run by HMPPS.')
    cy.get('h2').contains('How you should be able to use this website')
    cy.get('p').contains(
      'We want as many people as possible to be able to use this website. For example, that means you should be able to:',
    )
  }
}
