//  Feature: Referrer views list of existing applications
//    So that I can view my existing applications
//    As a referrer
//    I want to see them listen on an application dashboard
//
//  Scenario: show the dashboard
//    Given I am logged in
//    And there are applications in the database
//    When I visit the Previous Applications page
//    Then I should see all of the in progress applications

import ListPage from '../../pages/apply/list'
import { applicationSummaryFactory } from '../../../server/testutils/factories'

context('Applications dashboard', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    // Given I am logged in
    cy.signIn()
  })

  //  Scenario: show the dashboard
  // ----------------------------------------------
  it('shows the dashboard', () => {
    // There are applications in the database
    const inProgressApplications = applicationSummaryFactory.buildList(5, { status: 'inProgress' })

    cy.task('stubApplications', inProgressApplications)

    // I visit the Previous Applications page
    const page = ListPage.visit(inProgressApplications)

    // I should see all of the in progress applications
    page.shouldShowInProgressApplications()
  })
})
