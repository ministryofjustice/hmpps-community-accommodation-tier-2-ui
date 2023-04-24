import IndexPage from '../pages'

context('Index', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('displays the sign out button', () => {
    cy.signIn()
    IndexPage.visit()
    cy.get('[data-qa="signOut"]').should('exist')
  })
})
