export const pageIsActiveInNavigation = (linkText: string): void => {
  cy.get('.moj-side-navigation__item--active a').contains(linkText)
}

export const fieldIsOptional = (labelId: string): void => {
  cy.get(`label[for="${labelId}"]`).contains('(optional)')
}
