export const pageIsActiveInNavigation = (linkText: string): void => {
  cy.get('.moj-side-navigation__item--active a').contains(linkText)
}

export const pageHasLinkToGuidance = (): void => {
  cy.get('a')
    .contains('Who to contact for health care information')
    .should('have.attr', 'href')
    .and('match', new RegExp(Cypress._.escapeRegExp('tasks/health-needs/pages/guidance')))
}

export const fieldIsOptional = (labelId: string): void => {
  cy.get(`label[for="${labelId}"]`).contains('(optional)')
}
