//  Feature: Referrer completes 'Second preferred area' page
//    So that I can complete the 'Area information' task
//    As a referrer
//    I want to complete the 'Second preferred area' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'Second preferred area' page
//
//  Scenario: view 'Second preferred area' page
//    Then I see the "Second preferred area" page
//
//  Scenario: navigate to task list on completion of task
//    When I complete the "Second preferred area" page
//    And I continue to the next task / page
//    Then I am returned to the task list
//    And I see that the area information task is complete

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import SecondPreferredAreaPage from '../../../../pages/apply/area_and_funding/area_information/SecondPreferredAreaPage'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Visit "Second preferred area" page', () => {
  const person = personFactory.build({ name: 'Sue Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['area-information']
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

    // And I visit the 'Second preferred area' page
    // --------------------------------
    SecondPreferredAreaPage.visit(this.application)
  })

  // Scenario: view 'Second preferred area' page
  // ----------------------------------------------

  it('displays the page', function test() {
    // Then I see the "Second preferred area" page
    Page.verifyOnPage(SecondPreferredAreaPage, this.application)
  })

  // Scenario: navigate to task list on completion of task
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

    //  When I complete the "Second preferred area" page
    const page = Page.verifyOnPage(SecondPreferredAreaPage, this.application)
    page.getTextInputByIdAndEnterDetails('preferredArea', 'Birmingham')
    page.getTextInputByIdAndEnterDetails('preferenceReason', 'They have a job there')

    // When I continue to the next task / page
    page.clickSubmit()

    // Then I am returned to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the area information task is complete
    taskListPage.shouldShowTaskStatus('area-information', 'Completed')
  })
})
