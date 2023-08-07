//  Feature: Referrer completes 'mixed background' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the mixed background page
//
//  Scenario: submits a valid answer to mixed background page
//    Given I'm on the 'mixed background' question page
//    When I give a valid answer
//    Then I return to the task list page
//    And I see that the task has been completed

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import MixedBackgroundPage from '../../../../pages/apply/about_the_person/equality_and_diversity/mixedBackgroundPage'
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

    // And I am on the mixed background page
    // --------------------------------
    cy.visit('applications/abc123/tasks/equality-and-diversity-monitoring/pages/mixed-background')
    Page.verifyOnPage(MixedBackgroundPage, this.application)
  })

  // Scenario: select mixed background type
  // ----------------------------
  it('continues to task list page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(MixedBackgroundPage, this.application)
    page.selectMixedBackground()

    // after submission of the valid form the API will return the answered question

    const answered = {
      ...this.application,
    }
    answered.data['equality-and-diversity-monitoring']['mixed-background'] = { mixedBackground: 'english' }
    cy.task('stubApplicationGet', { application: answered })

    page.clickSubmit()

    // I return to the task list page
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // I see that the task has been completed
    taskListPage.shouldShowTaskStatus('equality-and-diversity-monitoring', 'Completed')
  })
})
