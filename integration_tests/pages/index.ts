import Page, { PageElement } from './page'

export default class IndexPage extends Page {
  constructor(name: string) {
    super('Apply for a CAS-2 placement', name)
  }

  static visit(name: string): IndexPage {
    cy.visit('/')

    return new IndexPage(name)
  }

  headerUserName = (): PageElement => cy.get('[data-qa=header-user-name]')

  courtRegisterLink = (): PageElement => cy.get('[href="/court-register"]')
}
