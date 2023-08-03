//  Feature: Referrer completes 'Sexual orientation' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the sexual orientation page
//
//  Scenario: submit sexual orientation answers
//    Given I'm on the 'Sexual orientation' question page
//    When I give valid answers to the 'Sexual orientation' questions
//    Then I return to the task list page
//    And I see that the task has been completed

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import SexualOrientationPage from '../../../../pages/apply/sexualOrientationPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the person" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring']['sexual-orientation'] = {}
      const application = applicationFactory.build({
        id: 'abc123',
        person,
      })
      application.data = applicationData
      cy.wrap(application).as('application')
      cy.wrap(application.data).as('applicationData')
    })
  })

  beforeEach(function test() {
    // And an application exists
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am on the sexual orientation page
    // --------------------------------
    cy.visit('applications/abc123/tasks/equality-and-diversity-monitoring/pages/sexual-orientation')
    Page.verifyOnPage(SexualOrientationPage, this.application)
  })

  // Scenario: select orientation
  // ----------------------------
  it('continues to task list page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(SexualOrientationPage, this.application)
    page.selectOrientation()

    page.clickSubmit()

    // I return to the task list page
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // I see that the task has been completed
    taskListPage.shouldShowTaskStatus('equality-and-diversity-monitoring', 'Completed')
  })
})