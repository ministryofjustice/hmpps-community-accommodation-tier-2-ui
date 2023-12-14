//  Feature: Referrer completes 'support worker preference' page
//    So that I can complete the "support worker preference" task
//    As a referrer
//    I want to complete the 'support worker preference' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'support worker preference' page
//
//  Scenario: view 'support worker preference' page
//    Then I see the "support worker preference" page
//
//  Scenario: navigate to the task list page
//    When I complete the "support worker preference" page
//    And I continue to the next task / page
//    Then I am taken to the task list page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import SupportWorkerPreferencePage from '../../../../pages/apply/about_the_person/personal_information/supportWorkerPreferencePage'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Visit "support worker preference" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['personal-information']['support-worker-preference']
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

    // And I visit the 'support worker preference' page
    // --------------------------------
    SupportWorkerPreferencePage.visit(this.application)
  })

  //  Scenario: view 'support worker preference' page
  // ----------------------------------------------

  it('presents support worker preference page', function test() {
    //    Then I see the "support worker preference" page
    Page.verifyOnPage(SupportWorkerPreferencePage, this.application)
  })

  //  Scenario: navigate to the task list page
  // ----------------------------------------------
  it('navigates to the support worker preference page', function test() {
    //    When I complete the "support worker preference" page
    const page = Page.verifyOnPage(SupportWorkerPreferencePage, this.application)
    page.completeForm()

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I am taken to the task list page
    Page.verifyOnPage(TaskListPage, this.application)
  })
})
