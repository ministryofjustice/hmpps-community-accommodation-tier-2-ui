//  Feature: Referrer completes 'National Insurance' page
//    So that I can complete the "Funding information" task
//    As a referrer
//    I want to complete the 'National Insurance' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'National Insurance' page
//
//  Scenario: view 'National Insurance' page
//    Then I see the "National Insurance" page
//
//  Scenario: navigate to task list on completion of task
//    When I complete the "National Insurance" page
//    And I continue to the next task / page
//    Then I am returned to the task list
//    And I see that the funding information task is complete

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import NationalInsurancePage from '../../../../pages/apply/area_and_funding/funding_information/nationalInsurancePage'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Visit "National Insurance" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['funding-information']
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

    // And I visit the 'National Insurance' page
    // --------------------------------
    NationalInsurancePage.visit(this.application)
  })

  //  Scenario: view 'National Insurance' page
  // ----------------------------------------------

  it('presents National Insurance page', function test() {
    //    Then I see the "National Insurance" page
    Page.verifyOnPage(NationalInsurancePage, this.application)
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

    //    When I complete the "National Insurance" page
    const page = Page.verifyOnPage(NationalInsurancePage, this.application)
    page.getTextInputByIdAndEnterDetails('nationalInsuranceNumber', '12345')

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I am returned to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    //    And I see that the funding information task is complete
    taskListPage.shouldShowTaskStatus('funding-information', 'Completed')
  })
})
