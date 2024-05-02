//  Feature: Referrer completes 'Health needs: brain injury' page
//    So that I can complete the "Health needs" task
//    As a referrer
//    I want to complete the 'other health' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the other health page
//
//  Scenario: view other health questions
//    Then I see the "other health" page
//
//  Scenario: complete page and navigate to next page in health needs task
//    When I complete the other health page
//    And I continue to the next task / page
//    Then I am returned to the task list
//    And I see that the health needs task is complete

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import OtherHealthPage from '../../../../pages/apply/risks_and_needs/health-needs/otherHealthPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "other health" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['health-needs'] = {}
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })
  })

  beforeEach(function test() {
    // And an application exists
    // -------------------------
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am on the "other health" page
    // -----------------------------------
    OtherHealthPage.visit(this.application)
  })

  //  Scenario: view "other health" questions
  //    Then I see the "other health" page
  it('presents "other health" page', function test() {
    Page.verifyOnPage(OtherHealthPage, this.application)
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I complete the other health page
  //    And I continue to the next task / page
  //    Then I am returned to the task list
  //    And I see that the health needs task is complete
  it('navigates to the next page (back to task list)', function test() {
    // So that the status of the task will be complete we set application.data
    // to the full set
    cy.fixture('applicationData.json').then(applicationData => {
      const answered = {
        ...this.application,
        data: applicationData,
      }
      cy.task('stubApplicationGet', { application: answered })
    })

    OtherHealthPage.visit(this.application)
    const page = new OtherHealthPage(this.application)

    page.describeLongTermHealthConditions()
    page.describeSeizures()
    page.confirmCancerTreatment()

    page.clickSubmit()

    const taskListPage = Page.verifyOnPage(TaskListPage, this.application)

    taskListPage.shouldShowTaskStatus('health-needs', 'Completed')
  })
})
