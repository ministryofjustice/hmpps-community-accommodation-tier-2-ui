import Page from '../page'

export default class CRNPage extends Page {
  constructor() {
    super(`Enter the person's CRN`)
  }

  static visit(): CRNPage {
    cy.visit('/applications/new')
    return new CRNPage()
  }
}
