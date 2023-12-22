//  Feature: user views dashboard page
//    So that I can navigate to the parts of the service that I need
//    As a user
//    I want to view the correct cards on the dashboard page
//
//  Scenario: viewing the dashboard page as a referrer
//      Given I am logged in as a referrer
//      When I visit the dashboard page
//      Then see the correct cards
//      And I see the sign out button
//
//  Scenario: viewing the dashboard page as an admin
//      Given I am logged in as an admin
//      When I visit the dashboard page
//      Then I see the correct cards
//
//  Scenario: viewing the dashboard page as an assessor
//      Given I am logged in as an assessor
//      When I visit the dashboard page
//      Then I see no cards

import DashboardPage from '../pages/dashboardPage'
import Page from '../pages/page'

context('Dashboard', () => {
  beforeEach(() => {
    cy.task('reset')
  })

  //  Scenario: viewing the dashboard page as a referrer
  it('shows the referrer cards', () => {
    // Given I am logged in as a referrer
    cy.task('stubSignIn', ['ROLE_POM'])
    cy.task('stubAuthUser')
    cy.signIn()

    //  When I visit the dashboard page
    DashboardPage.visit()
    const page = Page.verifyOnPage(DashboardPage)

    //  Then see the correct cards
    page.shouldShowCards(['referrals', 'new-referral'])

    //  And I see the sign out button
    page.shouldShowSignOutButton()
  })

  //  Scenario: viewing the dashboard page as an admin
  it('shows the admin cards', () => {
    // Given I am logged in as an admin
    cy.task('stubSignIn', ['ROLE_CAS2_ADMIN'])
    cy.task('stubAuthUser')
    cy.signIn()

    //  When I visit the dashboard page
    DashboardPage.visit()
    const page = Page.verifyOnPage(DashboardPage)

    //  Then see the correct cards
    page.shouldShowCards(['referrals', 'new-referral', 'submitted-applications'])
  })

  //  Scenario: viewing the dashboard page as an assessor
  it('shows the assessor cards', () => {
    // Given I am logged in as an assessor
    cy.task('stubSignIn', ['ROLE_CAS2_ASSESSOR'])
    cy.task('stubAuthUser')
    cy.signIn()

    //  When I visit the dashboard page
    DashboardPage.visit()
    const page = Page.verifyOnPage(DashboardPage)

    //  Then I see no cards
    page.shouldNotShowCards(['referrals', 'new-referral'])
  })
})
