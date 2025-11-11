import Page from '../page'

export default class PrivacyNoticePage extends Page {
  constructor() {
    const name = undefined
    super('Privacy notice', name)
  }

  static visit(): PrivacyNoticePage {
    cy.visit('/privacy-notice')

    return new PrivacyNoticePage()
  }

  shouldShowPrivacyNotice(): void {
    cy.get('h1').contains('Privacy notice for CAS2 HDC')
    cy.get('p').contains(
      'The Ministry of Justice (MOJ) is committed to the protection and security of your personal information.',
    )
    cy.get('h2').contains('How we collect your personal data and why we have it')
    cy.get('p').contains(
      'Most of the personal information we process is provided to us directly by you for one of the following reasons:',
    )
  }
}
