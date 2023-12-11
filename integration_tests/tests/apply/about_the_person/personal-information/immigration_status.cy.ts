//  Feature: Referrer completes 'immigration status' page
//    So that I can complete the "immigration status" task
//    As a referrer
//    I want to complete the 'immigration status' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'immigration status' page
//
//  Scenario: view 'immigration status' page
//    Then I see the "immigration status" page
//
//  Scenario: navigate to the task list on completion of task
//    When I complete the "immigration status" page
//    And I continue to the next task / page
//    Then I am taken to the task list page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import ImmigrationStatusPage from '../../../../pages/apply/about_the_person/personal_information/immigrationStatusPage'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Visit "immigration status" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['immigration-status']
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

    // And I visit the 'immigration status' page
    // --------------------------------
    ImmigrationStatusPage.visit(this.application)
  })

  //  Scenario: view 'immigration status' page
  // ----------------------------------------------

  it('presents immigration status page', function test() {
    //    Then I see the "immigration status" page
    Page.verifyOnPage(ImmigrationStatusPage, this.application)
  })

  //  Scenario: navigate to the task list
  // ----------------------------------------------
  it('navigates to the task list', function test() {
    //    When I complete the "immigration status" page
    const page = Page.verifyOnPage(ImmigrationStatusPage, this.application)
    page.completeForm()

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I am taken to the task list next page
    Page.verifyOnPage(TaskListPage, this.application)
  })
})
