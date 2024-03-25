import Page from '../../pages/page'
import CookiesPolicyPage from '../../pages/static/cookiesPolicyPage'

context('Privacy notice', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('displays the privacy notice', () => {
    cy.signIn()
    CookiesPolicyPage.visit()
    const page = Page.verifyOnPage(CookiesPolicyPage)

    page.shouldShowCookiePolicy()
  })
})
