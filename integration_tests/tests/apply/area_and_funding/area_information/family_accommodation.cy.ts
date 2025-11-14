//  Feature: Referrer completes 'Family accommodation' page
//    So that I can complete the 'Area information' task
//    As a referrer
//    I want to complete the 'Family accommodation' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'Family accommodation' page
//
//  Scenario: view 'Family accommodation' page
//    Then I see the "Family accommodation" page
//
//  Scenario: navigate to task list on completion of task
//    When I complete the "Family accommodation" page
//    And I continue to the next task / page
//    Then I am returned to the task list
//    And I see that the area information task is complete

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import FamilyAccommodation from '../../../../pages/apply/area_and_funding/area_information/FamilyAccommodationPage'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Visit "Family accommodation" page', () => {
  const person = personFactory.build({ name: 'Sue Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['area-information']
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

    // And I visit the 'Family accommodation' page
    // --------------------------------
    FamilyAccommodation.visit(this.application)
  })

  // Scenario: view 'Family accommodation' page
  // ----------------------------------------------

  it('displays the page', function test() {
    // Then I see the "Family accommodation" page
    Page.verifyOnPage(FamilyAccommodation, this.application)
  })

  // Scenario: navigate to task list on completion of task
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

    //  When I complete the "Family accommodation" page
    const page = Page.verifyOnPage(FamilyAccommodation, this.application)
    page.checkRadioByNameAndValue('familyProperty', 'yes')

    // When I continue to the next task / page
    page.clickSubmit()

    // Then I am returned to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the area information task is complete
    taskListPage.shouldShowTaskStatus('area-information', 'Completed')
  })
})
