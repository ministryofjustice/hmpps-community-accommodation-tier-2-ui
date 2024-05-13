import Page from '../../pages/page'
import AccessibilityStatementPage from '../../pages/static/accessibilityStatementPage'

context('Accessibility statement', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('displays the accessibility statement', () => {
    cy.signIn()
    AccessibilityStatementPage.visit()
    const page = Page.verifyOnPage(AccessibilityStatementPage)

    page.shouldShowAccessibilityStatement()
  })
})
