import ListPage from '../../pages/apply/list'
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
})
