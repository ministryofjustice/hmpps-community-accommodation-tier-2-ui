//  Feature: user views prison dashboard
//    So that I can see recent submitted applications
//    for my Prison
//    So that I can manage applications
//
//  Scenario: viewing the prison dashboard as a referrer
//      Given I am logged in as a referrer
//      And there are applications for my prison in the database
//      When I visit the prison dashboard
//      Then I can see a list of applications for my prison
//      And I can tab back to my applications
import { applicationSummaryFactory } from '../../../server/testutils/factories'
import PrisonDashboardPage from '../../pages/apply/prisonDashboard'

context('PrisonDashboard', () => {
  //  Scenario: viewing the prison dashboard as a referrer
  it('sees tab for my applications', () => {
    // Given I am logged in as a referrer
    const prisonCode = 'abc'
    cy.task('stubSignIn', ['ROLE_POM'])
    cy.task('stubAuthUser', { activeCaseLoadId: prisonCode })
    cy.signIn()

    //  And there are applications for my prison in the database
    const applications = applicationSummaryFactory.buildList(5)
    cy.task('stubPrisonApplications', { applications, prisonCode })

    //  When I visit the prison dashboard
    const page = PrisonDashboardPage.visit()

    //  Then I can see a list of applications for my prison
    page.shouldShowApplications(applications)

    //  And I can tab back to my applications
    page.shouldShowMyApplicationsTab()
  })
})
