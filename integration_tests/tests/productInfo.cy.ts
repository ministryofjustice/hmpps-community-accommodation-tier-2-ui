import activePrisons from '../../server/utils/activePrisons'

context('Product info', () => {
  context('Info provided', () => {
    beforeEach(() => {
      cy.task('reset')
      cy.task('stubAuthPing')
      cy.task('stubTokenVerificationPing')
    })

    it('Returns a list of prison codes we have released to as activeAgencies', () => {
      cy.request('/info').its('body.activeAgencies').should('deep.eq', activePrisons)
    })
  })
})
