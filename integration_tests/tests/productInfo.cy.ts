context('Product info', () => {
  context('Info provided', () => {
    beforeEach(() => {
      cy.task('reset')
      cy.task('stubAuthPing')
      cy.task('stubTokenVerificationPing')
    })

    it('Returns an empty list of active agencies', () => {
      cy.request('/info').its('body.activeAgencies').should('be.empty')
    })
  })
})
