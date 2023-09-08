//  Feature: Referrer completes 'additional risk information' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'additional risk information' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'additional risk information' page
//
//  Scenario: view 'additional risk information' page
//    Then I see the "additional risk information" page
//
//  Scenario: navigate to task list on completion of task
//    When I continue to the next task / page
//    Then I see the "additional risk information" page
//    Then I am returned to the task list
//    And I see that the risk of serious harm task is complete

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import AdditionalRiskInformationPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/additionalRiskInformationPage'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Visit "additional risk information" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['risk-of-serious-harm'] = {}
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

    // And I visit the 'additional risk information' page
    // --------------------------------
    AdditionalRiskInformationPage.visit(this.application)
  })

  //  Scenario: view 'additional risk information' page
  // ----------------------------------------------

  it('presents additional risk information page', function test() {
    //    Then I see the "additional risk information" page
    Page.verifyOnPage(AdditionalRiskInformationPage, this.application)
  })

  //  Scenario: navigate to task list on completion of task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    // So that the status of the task will be complete we set application.data
    // to the full set
    cy.fixture('applicationData.json').then(applicationData => {
      const answered = {
        ...this.application,
        data: applicationData,
      }
      cy.task('stubApplicationGet', { application: answered })
    })

    //    When I continue to the next task / page
    const page = Page.verifyOnPage(AdditionalRiskInformationPage, this.application)
    page.clickSubmit()

    //    Then I am returned to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage, this.application)

    //    And I see that the risk of serious harm task is complete
    taskListPage.shouldShowTaskStatus('risk-of-serious-harm', 'Completed')
  })
})
