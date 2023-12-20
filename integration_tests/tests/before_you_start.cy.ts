import BeforeYouStartPage from '../pages/apply/beforeYouStartPage'
import Page from '../pages/page'

context('Before you start', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('displays the user guidance', () => {
    cy.signIn()
    BeforeYouStartPage.visit(undefined)
    const page = Page.verifyOnPage(BeforeYouStartPage)

    page.shouldShowApplicationGuidance()
  })
})
