Cypress.Commands.add('signIn', (options = { failOnStatusCode: true }) => {
  cy.request('/')
  return cy.task('getSignInUrl').then((url: string) => cy.visit(url, options))
})

Cypress.Commands.add('assertValueCopiedToClipboardContains', value => {
  cy.window().then(win => {
    win.navigator.clipboard.readText().then(text => {
      expect(text).to.contain(value)
    })
  })
})
