//  Feature: Referrer views tasklist
//    So that I can access the individual tasks in the application journey
//    As a referrer
//    I want to view a list of form tasks, grouped into sections

//  Background:
//    Given there is a section with a task
//    And an application exists
//    And I am logged in
//
//  Scenario: Sees link to tasks within their sections
//    When I view the application
//    Then I see the 'Area and funding' section

import Page from '../../pages/page'
import TaskListPage from '../../pages/apply/taskListPage'
import { personFactory, applicationFactory } from '../../../server/testutils/factories/index'

context('View task list', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  beforeEach(function test() {
    // Given an application exists
    // -------------------------
    const newApplication = applicationFactory.build({ id: 'abc123', person })
    cy.task('stubApplicationGet', { application: newApplication })

    // Given I am logged in
    //---------------------
    cy.signIn()
  })

  // Scenario: Sees link to tasks within their sections
  // --------------------------------------------------
  it('shows the task listed within the section', () => {
    // When I view the application
    cy.visit('applications/abc123')

    // Then I'm on the task list page
    cy.get('h2').contains('Application incomplete')
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see the 'Area and funding' section
    taskListPage.shouldShowAreaAndFundingSection()
    // And I should see that the task has not been started
    taskListPage.shouldShowTaskStatus('area-and-funding', 'Not started')

    // And I see the 'About Person' section
    taskListPage.shouldShowAboutPersonSection()
    // And I should see that the task cannot yet be started
    taskListPage.shouldShowTaskStatus('about-the-person', 'Cannot start yet')
  })
})
