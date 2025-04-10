//  Feature: user views prison dashboard
//    So that I can see recent submitted applications
//    for my Prison
//    So that I can manage applications
//
//  Scenario: viewing the prison dashboard as a referrer
//      Given I am logged in as a referrer
//      And there are allocated applications for my prison in the database
//      When I visit the prison dashboard
//      Then I can see a list of allocated applications for my prison
//      And no Transferred In applications
//      And I can tab back to my applications
//
//  Scenario: viewing the prison dashboard that has unallocated applications as a referrer
//      Given I am logged in as a referrer
//      And there are unallocated applications for my prison in the database
//      And there are allocated applications for my prison in the database
//      When I visit the prison dashboard
//      Then I can see a list of unallocated applications that have been transferred into my prison
//      And I can see a list of allocated applications for my prison
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
    cy.task('stubPrisonApplications', { applications, prisonCode, assignmentType: 'ALLOCATED', page: 1 })
    cy.task('stubPrisonApplications', { applications: [], prisonCode, assignmentType: 'UNALLOCATED', page: 1 })

    //  When I visit the prison dashboard
    const page = PrisonDashboardPage.visit()

    //  Then I can see a list of applications for my prison
    page.shouldShowApplications(applications)

    //  And no Transferred In applications
    page.shouldHideTransferredIn()

    cy.task('stubPrisonApplications', { applications, prisonCode, assignmentType: 'ALLOCATED', page: 2 })
    cy.task('stubPrisonApplications', { applications: [], prisonCode, assignmentType: 'UNALLOCATED', page: 2 })

    page.clickPageNumber('2')
    page.shouldShowApplications(applications)

    //  And I can tab back to my applications
    page.shouldShowMyApplicationsTab()
  })

  //  Scenario: viewing the prison dashboard that has unallocated applications as a referrer
  it('shows a list of unallocated applications that have recently been transferred into my prison', () => {
    // Given I am logged in as a referrer
    const prisonCode = 'abc'
    cy.task('stubSignIn', ['ROLE_POM'])
    cy.task('stubAuthUser', { activeCaseLoadId: prisonCode })
    cy.signIn()

    // And there are unallocated applications for my prison in the database
    const transferredInApplication = applicationSummaryFactory.buildList(5)
    cy.task('stubPrisonApplications', {
      applications: transferredInApplication,
      prisonCode,
      assignmentType: 'UNALLOCATED',
      page: 1,
    })

    // And there are allocated applications for my prison in the database
    const applications = applicationSummaryFactory.buildList(5)
    cy.task('stubPrisonApplications', { applications, prisonCode, assignmentType: 'ALLOCATED', page: 1 })

    // When I visit the prison dashboard
    const page = PrisonDashboardPage.visit()

    // Then I can see a list of unallocated applications that have been transferred into my prison
    page.shouldShowTransferredIn(transferredInApplication)

    // And I can see a list of allocated applications for my prison
    page.shouldShowApplications(applications)

    cy.task('stubPrisonApplications', {
      applications: transferredInApplication,
      prisonCode,
      assignmentType: 'UNALLOCATED',
      page: 2,
    })
    cy.task('stubPrisonApplications', { applications, prisonCode, assignmentType: 'ALLOCATED', page: 2 })
    page.clickPageNumber('2')
    page.shouldShowApplications(applications)

    //  And I can tab back to my applications
    page.shouldShowMyApplicationsTab()
  })
})
