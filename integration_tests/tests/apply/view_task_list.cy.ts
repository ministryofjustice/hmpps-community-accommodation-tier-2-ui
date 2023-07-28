//  Feature: Referrer views list of tasks for an in progress application
//    So that I can access the individual tasks in the application journey
//    As a referrer
//    I want to view a list of form tasks, grouped into sections
//
//  Scenario: view list of tasks
//    Given I am logged in
//    And an application exists
//    When I visit the task list page
//    Then I see the task listed by section

import { applicationFactory } from '../../../server/testutils/factories'
import Page from '../../pages/page'
import TaskListPage from '../../pages/apply/taskListPage'

context('Visit task list', () => {
  const application = applicationFactory.build({ id: 'abc123' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  beforeEach(function test() {
    // Given I am logged in
    //---------------------
    cy.signIn()

    // And an application exists
    // -------------------------
    cy.task('stubApplicationGet', { application })
  })

  // Scenario: view list of tasks
  // ----------------------------------------------
  it('shows the tasks listed by section', () => {
    // I visit the task list page
    // --------------------------------
    cy.visit('applications/abc123')
    const page = Page.verifyOnPage(TaskListPage)

    // I see the task listed by section
    page.shouldShowTasksWithinTheirSections()
  })
})
