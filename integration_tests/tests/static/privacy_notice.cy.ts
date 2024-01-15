import PrivacyNoticePage from '../../pages/static/privacyNoticePage'
import Page from '../../pages/page'

context('Privacy notice', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('displays the privacy notice', () => {
    cy.signIn()
    PrivacyNoticePage.visit()
    const page = Page.verifyOnPage(PrivacyNoticePage)

    page.shouldShowPrivacyNotice()
  })
})
