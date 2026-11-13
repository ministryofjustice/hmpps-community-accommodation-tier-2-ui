context('Healthcheck', () => {
  context('All healthy', () => {
    beforeEach(() => {
      cy.task('reset')
      cy.task('stubAuthPing')
      cy.task('stubTokenVerificationPing')
      cy.task('stubApprovedPremisesPing')
    })

    it('Health check page is visible', () => {
      cy.request({ url: '/health', method: 'GET' }).then(response => {
        expect(response.body.components).to.have.property('hmppsAuth')
        expect(response.body.components).to.have.property('tokenVerification')
        expect(response.body.components).to.have.property('approvedPremises')
        expect(response.body).to.have.property('build')
      })
    })

    it('Ping is visible and UP', () => {
      cy.request('/ping').its('body.status').should('equal', 'UP')
    })
  })

  context('Some unhealthy', () => {
    it('Reports correctly when token verification down', () => {
      cy.task('reset')
      cy.task('stubAuthPing')
      cy.task('stubTokenVerificationPing', 500)

      cy.request({ url: '/health', method: 'GET', failOnStatusCode: false }).then(response => {
        expect(response.body.components.hmppsAuth.status).to.equal('UP')
        expect(response.body.components.tokenVerification.details).to.contain({ status: 500, attempts: 3 })
      })
    })
  })

  context('Sentry check', () => {
    it('Throws a test error', () => {
      cy.request({ url: '/debug-sentry', method: 'GET', failOnStatusCode: false }).then(response => {
        expect(response.status).to.equal(500)
        expect(response.body).to.contain('Test Sentry error thrown.')
      })
    })
  })
})
