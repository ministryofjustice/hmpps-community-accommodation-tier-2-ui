//  Feature: Referrer completes 'marital status' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the marital status page
//
//  Scenario: submits a valid answer to marital status page
//    Given I'm on the 'marital status' question page
//    When I give a valid answer
//    Then I am taken to the task list page page
//    And I see thatthe task is complete

import TaskListPage from '../../../../pages/apply/taskListPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import MaritalStatusPage from '../../../../pages/apply/about_the_person/equality_and_diversity/maritalStatusPage'
import Page from '../../../../pages/page'

context('Visit "About the applicant" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring']['marital-status'] = {}
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

    // And I am on the marital status page
    // --------------------------------
    MaritalStatusPage.visit(this.application)

    Page.verifyOnPage(MaritalStatusPage, this.application)
  })

  // Scenario: submits a valid answer to marital status page
  // ----------------------------
  it('continues to the task list page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(MaritalStatusPage, this.application)
    page.selectAnswer('maritalStatus', 'marriedButSeparated')

    this.application.data['equality-and-diversity-monitoring']['marital-status'] = {
      maritalStatus: 'marriedButSeparated',
    }
    cy.task('stubApplicationGet', { application: this.application })

    page.clickSubmit()

    // I am taken to the task list page
    const taskListPage = Page.verifyOnPage(TaskListPage, this.application)

    // And I see that the task is now complete
    taskListPage.shouldShowTaskStatus('equality-and-diversity-monitoring', 'Completed')
  })
})
