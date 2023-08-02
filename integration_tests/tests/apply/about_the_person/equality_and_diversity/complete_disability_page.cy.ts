//  Feature: Referrer completes disability question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the disability page
//
//  Scenario: submit 'other' disability type
//    Given I'm on the 'Do they have a disability?' page
//    When I submit an 'other' disability type
//    Then I return to the task list page
//    And I see that the task has been completed

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import DisabilityPage from '../../../../pages/apply/disabilityPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the person" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      const application = applicationFactory.build({
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
    const application = applicationFactory.build({
      id: 'abc123',
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': { isEligible: 'yes' },
        },
        'funding-information': {
          'funding-source': {},
        },
        'equality-and-diversity-monitoring': {
          'will-answer-equality-questions': {},
          disability: {},
        },
      },
      person,
    })
    cy.task('stubApplicationGet', { application })
    cy.task('stubApplicationUpdate', { application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am on the disability question page
    // --------------------------------
    cy.visit('applications/abc123/tasks/equality-and-diversity-monitoring/pages/disability')
    Page.verifyOnPage(DisabilityPage, this.application)
  })

  // Scenario: submit 'other' disability type
  // ----------------------------
  it('continues to task list page', function test() {
    // I submit an 'other' disability type
    const page = Page.verifyOnPage(DisabilityPage, this.application)
    page.enterOtherDisabilityType()

    page.clickSubmit()

    // I return to the task list page
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // I see that the task has been completed
    taskListPage.shouldShowTaskStatus('equality-and-diversity-monitoring', 'Completed')
  })
})
