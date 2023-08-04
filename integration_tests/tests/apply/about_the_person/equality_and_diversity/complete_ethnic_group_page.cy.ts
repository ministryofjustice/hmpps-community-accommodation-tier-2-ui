//  Feature: Referrer completes 'Ethnic group' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the sexual orientation page
//
//  Scenario: submit ethnic group answer
//    Given I'm on the 'Ethnic group' question page
//    When I give valid answers to the 'Ethnic group' questions
//    Then I return to the task list page
//    And I see that the task has been completed

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import EthnicGroupPage from '../../../../pages/apply/ethnicGroupPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the person" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring']['ethnic-group'] = {}
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

    // And I am on the ethnic group page
    // --------------------------------
    cy.visit('applications/abc123/tasks/equality-and-diversity-monitoring/pages/ethnic-group')
    Page.verifyOnPage(EthnicGroupPage, this.application)
  })

  // Scenario: select ethnic group
  // ----------------------------
  it('continues to task list page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(EthnicGroupPage, this.application)
    page.selectEthnicGroup()

    page.clickSubmit()

    // I return to the task list page
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // I see that the task has been completed
    taskListPage.shouldShowTaskStatus('equality-and-diversity-monitoring', 'Completed')
  })
})
