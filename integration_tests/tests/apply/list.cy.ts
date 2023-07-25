import ListPage from '../../pages/apply/list'
import Page from '../../pages/page'
import CRNPage from '../../pages/apply/crnPage'
import { applicationSummaryFactory } from '../../../server/testutils/factories'

context('Applications dashboard', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('shows the dashboard', () => {
    // Given I am logged in
    cy.signIn()

    // And there are applications in the database
    const inProgressApplications = applicationSummaryFactory.buildList(5, { status: 'inProgress' })

    cy.task('stubApplications', inProgressApplications)

    // When I visit the Previous Applications page
    const page = ListPage.visit(inProgressApplications)

    // Then I should see all of the in progress applications
    page.shouldShowInProgressApplications()
  })

  it('lets me navigate to the CRN page', () => {
    // Given I am logged in
    cy.signIn()

    cy.task('stubApplications', [])

    // When I visit the Previous Applications page
    const page = ListPage.visit([])

    // And I click the 'Start a new application' link
    cy.get('a').contains('Start a new application').click()

    // Then I should be on the 'Enter CRN' page
    const crnPage = Page.verifyOnPage(CRNPage)
  })
})
