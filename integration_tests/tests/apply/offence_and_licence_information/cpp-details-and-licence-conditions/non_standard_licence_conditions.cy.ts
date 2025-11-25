//  Feature: Referrer completes 'Non-standard licence conditions' page
//    So that I can complete the "HDC licence and Non-standard licence conditions" task
//    As a referrer
//    I want to complete the 'Non-standard licence conditions' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'Non-standard licence conditions' page
//
//  Scenario: view 'Non-standard licence conditions' page
//    Then I see the "Non-standard licence conditions" page
//
//  Scenario: navigate to task list on completion of task
//    When I complete the "Non-standard licence conditions" page
//    And I continue to the next task / page
//    Then I am taken to the non-standard licence conditions page
//    And I see that the CPP details and licence information task is complete

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import NonStandardLicenceConditionsPage from '../../../../pages/apply/offence_and_licence_information/hdc-licence-and-cpp-details/nonStandardLicenceConditions'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Visit "Non-standard licence conditions" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['cpp-details-and-hdc-licence-conditions']
      const application = applicationFactory.build({
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

    // And I visit the 'Non-standard licence conditions' page
    // --------------------------------
    NonStandardLicenceConditionsPage.visit(this.application)
  })

  //  Scenario: view 'Non-standard licence conditions' page
  // ----------------------------------------------
  it('presents Non-standard licence conditions page', function test() {
    //  Then I see the "Non-standard licence conditions" page
    Page.verifyOnPage(NonStandardLicenceConditionsPage, this.application)
  })

  //  Scenario: navigate to Non-standard licence conditions page
  // ----------------------------------------------
  it('navigates to the task list', function test() {
    // So that the status of the task will be complete we set application.data
    // to the full set
    cy.fixture('applicationData.json').then(applicationData => {
      const answered = {
        ...this.application,
        data: applicationData,
      }
      cy.task('stubApplicationGet', { application: answered })
    })

    // When I complete the "Non-standard licence conditions" page
    const page = Page.verifyOnPage(NonStandardLicenceConditionsPage, this.application)
    page.completeForm()

    // When I continue to the next task / page
    page.clickSubmit()

    // Then I am taken back to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the CPP details and licence information task is complete
    taskListPage.shouldShowTaskStatus('cpp-details-and-hdc-licence-conditions', 'Completed')
  })
})
