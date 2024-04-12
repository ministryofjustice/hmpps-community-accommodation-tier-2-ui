//  Feature: user views prison dashboard
//    So that I can see recent submitted applications
//    for my Prison
//    So that I can manage applications
//
//  Scenario: viewing the prison dashboard as a referrer
//      Given I am logged in as a referrer
//      When I visit the prison dashboard
//      Then I can tab back to my applications
import PrisonDashboardPage from '../../pages/apply/prisonDashboard'

context('PrisonDashboard', () => {
  //  Scenario: viewing the prison dashboard as a referrer
  it('sees tab for my applications', () => {
    // Given I am logged in as a referrer
    cy.task('stubSignIn', ['ROLE_POM'])
    cy.task('stubAuthUser')
    cy.signIn()

    //      When I visit the prison dashboard
    const page = PrisonDashboardPage.visit()
    page.shouldShowMyApplicationsTab()
  })
})
