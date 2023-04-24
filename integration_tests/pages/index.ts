import Page, { PageElement } from './page'

export default class IndexPage extends Page {
  constructor() {
    super('Apply for a CAS-2 placement')
  }

  static visit(): IndexPage {
    cy.visit('/')
    return new IndexPage()
  }

  headerUserName = (): PageElement => cy.get('[data-qa=header-user-name]')

  courtRegisterLink = (): PageElement => cy.get('[href="/court-register"]')
}
