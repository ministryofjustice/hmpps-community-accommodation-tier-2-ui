import Page from '../page'

export default class CRNPage extends Page {
  constructor(name: string) {
    super(`Enter the person's CRN`, name)
  }

  static visit(name: string): CRNPage {
    cy.visit('/applications/new')
    return new CRNPage(name)
  }
}
