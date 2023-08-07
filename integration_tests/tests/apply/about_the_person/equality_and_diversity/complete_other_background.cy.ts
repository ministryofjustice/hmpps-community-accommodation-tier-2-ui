//  Feature: Referrer completes 'other background' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the other background page
//
//  Scenario: submits a valid answer to other background page
//    Given I'm on the 'other background' question page
//    When I give a valid answer
//    Then I return to the task list page
//    And I see that the task has been completed

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import OtherBackgroundPage from '../../../../pages/apply/about_the_person/equality_and_diversity/otherBackgroundPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the person" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring'] = {}
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

    // And I am on the other background page
    // --------------------------------
    cy.visit('applications/abc123/tasks/equality-and-diversity-monitoring/pages/other-background')
    Page.verifyOnPage(OtherBackgroundPage, this.application)
  })

  // Scenario: select other background type
  // ----------------------------
  it('continues to task list page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(OtherBackgroundPage, this.application)
    page.selectOtherBackground()

    // after submission of the valid form the API will return the answered question

    const answered = {
      ...this.application,
    }
    answered.data['equality-and-diversity-monitoring']['other-background'] = { otherBackground: 'african' }
    cy.task('stubApplicationGet', { application: answered })

    page.clickSubmit()

    // I return to the task list page
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // I see that the task has been completed
    taskListPage.shouldShowTaskStatus('equality-and-diversity-monitoring', 'Completed')
  })
})
