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
//  Scenario: navigate to next page in health needs task
//    When I continue to the next task / page
//    Then I am returned to the task list

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import OtherHealthPage from '../../../../pages/apply/risks-and-needs/otherHealthPage'
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

  //  Scenario: navigate to next page in health needs task
  //    When I continue to the next task / page
  //    Then I am returned to the task list
  it('navigates to the next page (back to task list)', function test() {
    OtherHealthPage.visit(this.application)
    const page = new OtherHealthPage(this.application)
    page.clickSubmit()

    Page.verifyOnPage(TaskListPage, this.application)
  })
})
