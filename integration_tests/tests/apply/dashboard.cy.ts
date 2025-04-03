//  Feature: Referrer views list of existing applications
//    So that I can view my existing applications
//    As a referrer
//    I want to see them listen on an application dashboard
//
//  Scenario: show in progress applications
//    Given I am logged in
//    And there are in progress applications in the database
//    When I visit the Previous Applications page
//    Then I should see all of the in progress applications
//    And I should not see the Transferred out applications tab
//
//  Scenario: show submitted applications
//    Given I am logged in
//    And there are submitted applications in the database
//    When I visit the Submitted Applications tab
//    Then I should see all of my submitted applications
//    And I should not see the Transferred out applications tab
//
//  Scenario: show transferred out applications
//    Given I am logged in
//    And there are transferred applications in the database
//    When I visit the Transferred Applications tab
//    Then I should see all of my submitted applications
//
//  Scenario: hide submitted applications
//    Given I am logged in
//    And there are no transferred out applications in the database
//    When I visit the Your Applications page
//    Then I should not see the transferred out applications tab
//
//  Scenario: see prison dashboad
//    Given I am logged in
//    Then I see a tab for my prison's applications

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

  //  Scenario: show in progress applications
  // ----------------------------------------------
  it('shows in progress applications', () => {
    // There are applications in the database
    const inProgressApplications = applicationSummaryFactory.buildList(5, {
      status: 'inProgress',
      latestStatusUpdate: null,
    })

    cy.task('stubApplications', { applications: inProgressApplications, assignmentType: 'CREATED' })
    cy.task('stubApplications', { applications: [], assignmentType: 'ALLOCATED' })
    cy.task('stubApplications', { applications: [], assignmentType: 'DEALLOCATED' })

    // I visit the Previous Applications page
    const page = ListPage.visit(inProgressApplications)

    // I should see all of the in progress applications
    page.shouldShowInProgressApplications()

    // I should not see the Transferred out applications tab
    page.shouldNotShowTransferredOutTab()
  })
  //  Scenario: show submitted applications
  it('shows submitted applications', () => {
    // There are applications in the database
    const submittedApplications = applicationSummaryFactory.buildList(5, {
      status: 'submitted',
    })

    cy.task('stubApplications', { applications: [], assignmentType: 'CREATED' })
    cy.task('stubApplications', { applications: submittedApplications, assignmentType: 'ALLOCATED' })
    cy.task('stubApplications', { applications: [], assignmentType: 'DEALLOCATED' })

    // I visit the submitted applications tab
    const page = ListPage.visit(submittedApplications)

    // I should see all the in progress applications
    page.shouldShowSubmittedApplications()

    // I should not see the Transferred out applications tab
    page.shouldNotShowTransferredOutTab()
  })

  //  Scenario: show transferred out applications
  it('shows transferred out applications', () => {
    // There are transferred applications in the database
    const transferredOutApplications = applicationSummaryFactory.buildList(5, {
      status: 'submitted',
    })

    cy.task('stubApplications', { applications: [], assignmentType: 'CREATED' })
    cy.task('stubApplications', { applications: [], assignmentType: 'ALLOCATED' })
    cy.task('stubApplications', { applications: transferredOutApplications, assignmentType: 'DEALLOCATED' })

    // I visit the Transferred Applications tab
    const page = ListPage.visit(transferredOutApplications)

    // I should see all of my transferred applications
    page.shouldShowTransferredOutApplications()
  })

  //  Scenario: hide submitted applications
  it('hides submitted applications', () => {
    //  There are no transferred out applications in the database
    cy.task('stubApplications', { applications: [], assignmentType: 'CREATED' })
    cy.task('stubApplications', { applications: [], assignmentType: 'ALLOCATED' })
    cy.task('stubApplications', { applications: [], assignmentType: 'DEALLOCATED' })

    // I visit the Your Applications page
    const page = ListPage.visit([])

    // I should not see the Transferred out applications tab
    page.shouldNotShowTransferredOutTab()
  })

  //  Scenario: see prison dashboard
  it('shows prison dashboard tab', () => {
    // There are applications in the database
    const submittedApplications = applicationSummaryFactory.buildList(1, {
      status: 'submitted',
    })

    cy.task('stubApplications', { applications: [], assignmentType: 'CREATED' })
    cy.task('stubApplications', { applications: submittedApplications, assignmentType: 'ALLOCATED' })
    cy.task('stubApplications', { applications: [], assignmentType: 'DEALLOCATED' })

    // Then I see a tab for my prison's applications
    const page = ListPage.visit(submittedApplications)
    page.shouldShowPrisonTab()
  })
})
