//  Feature: Referrer completes 'Confirm eligibility' task
//    So that I can complete the 'Confirm eligibility' task
//    As a referrer
//    I want to answer questions within that task
//
//  Scenario: Follows link from task list
//    Given there is a section with a task
//    And an application exists
//    And I am logged in
//    And I am viewing the application task list
//
//  Scenario: view task within task list
//    Then I see that the task has not been started

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the person" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      const application = applicationFactory.build({
        id: 'abc123',
        data: {
          'funding-information': {
            'funding-source': { fundingSource: 'personalSavings' },
          },
        },
        person,
      })
      application.data = applicationData
      cy.wrap(application).as('application')
      cy.wrap(application.data).as('applicationData')
    })
  })

  beforeEach(function test() {
    // And an application exists
    // -------------------------
    const newApplication = applicationFactory.build({
      id: 'abc123',
      data: {
        'funding-information': {
          'funding-source': { fundingSource: 'personalSavings' },
        },
      },
      person,
    })
    cy.task('stubApplicationGet', { application: newApplication })
    cy.task('stubApplicationUpdate', { application: newApplication })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am viewing the application
    // --------------------------------
    cy.visit('applications/abc123')
    Page.verifyOnPage(TaskListPage)
  })

  // Scenario: view task within task list
  // ------------------------------------
  it('shows the task listed within the section', () => {
    // I see that the task has not been started
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.shouldShowTaskStatus('confirm-eligibility', 'Not started')
    taskListPage.shouldShowTaskWithinSection('Check eligibility for CAS-2', 'Before you start')
  })
})
