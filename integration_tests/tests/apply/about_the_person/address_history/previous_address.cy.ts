//  Feature: Referrer completes 'previous address' page
//    So that I can complete the "Address history" task
//    As a referrer
//    I want to complete the 'previous address' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'previous address' page
//
//  Scenario: view 'previous address' page
//    Then I see the "previous address" page
//
//  Scenario: navigate to task list on completion of task
//    When I complete the "previous address" page
//    And I continue to the next task / page
//    Then I am taken to the Task List
//
//  Scenario: when the address is not known, it navigates to task list on completion of task
//    When I complete the "previous address" page
//    And I continue to the next task / page
//    Then I am taken to the Task List

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import PreviousAddressPage from '../../../../pages/apply/about_the_person/address_history/previousAddressPage'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Visit "previous address" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['address-history']
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

    // And I visit the 'previous address' page
    // --------------------------------
    PreviousAddressPage.visit(this.application)
  })

  //  Scenario: view 'previous address' page
  // ----------------------------------------------

  it('presents previous address page', function test() {
    //    Then I see the "previous address" page
    Page.verifyOnPage(PreviousAddressPage, this.application)
  })

  //  Scenario: navigate to Offence History page
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    //    When I complete the "previous address" page
    const page = Page.verifyOnPage(PreviousAddressPage, this.application)
    page.checkRadioByNameAndValue('hasPreviousAddress', 'yes')
    page.addKnownAddressInformation()

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I am taken to the Task List
    Page.verifyOnPage(TaskListPage, this.application)
  })

  //  Scenario: when the address is not known, it navigates to task list on completion of task
  // ----------------------------------------------

  it('navigates to the next page', function test() {
    //    When I complete the "previous address" page
    const page = Page.verifyOnPage(PreviousAddressPage, this.application)
    page.checkRadioByNameAndValue('hasPreviousAddress', 'no')
    page.addLastKnownAddressInformation()

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I am taken to the Task List
    Page.verifyOnPage(TaskListPage, this.application)
  })
})
