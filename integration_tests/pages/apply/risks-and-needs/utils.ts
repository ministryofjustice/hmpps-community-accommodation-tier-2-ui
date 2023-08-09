export const pageIsActiveInNavigation = (linkText: string): void => {
  cy.get('.moj-side-navigation__item--active a').contains(linkText)
}
