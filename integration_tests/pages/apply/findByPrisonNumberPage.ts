import Page from '../page'

export default class FindByPrisonNumberPage extends Page {
  constructor(name: string) {
    super(`Enter the person's prison number`, name)
  }

  static visit(name: string): FindByPrisonNumberPage {
    cy.visit('/applications/new')
    return new FindByPrisonNumberPage(name)
  }
}
