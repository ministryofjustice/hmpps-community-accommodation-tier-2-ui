//  Feature: Referrer completes 'Exclusion zones' page
//    So that I can complete the 'Area information' task
//    As a referrer
//    I want to complete the 'Exclusion zones' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'Exclusion zones' page
//
//  Scenario: view 'Exclusion zones' page
//    Then I see the "Exclusion zones" page
//
//  Scenario: navigates to the next task on completion of task
//    When I complete the "Exclusion zones" page
//    And I continue to the next task / page
//    Then I am taken to the "Family accommodation" page
//    And I see that the area information task is complete

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import ExclusionZonesPage from '../../../../pages/apply/area_and_funding/area_information/ExclusionZonesPage'
import FamilyAccommodationPage from '../../../../pages/apply/area_and_funding/area_information/FamilyAccommodationPage'

context('Visit "Exclusion zones" page', () => {
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

    // And I visit the 'Exclusion zones' page
    // --------------------------------
    ExclusionZonesPage.visit(this.application)
  })

  // Scenario: view 'Exclusion zones' page
  // ----------------------------------------------

  it('displays the page', function test() {
    // Then I see the "Exclusion zones" page
    Page.verifyOnPage(ExclusionZonesPage, this.application)
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

    //  When I complete the "Exclusion zones" page
    const page = Page.verifyOnPage(ExclusionZonesPage, this.application)
    page.checkRadioByNameAndValue('hasExclusionZones', 'yes')
    page.getTextInputByIdAndEnterDetails('exclusionZonesDetail', 'Avoid Liverpool')

    // When I continue to the next task / page
    page.clickSubmit()

    // Then I am taken to the "Family accommodation" page
    Page.verifyOnPage(FamilyAccommodationPage, this.application)
  })
})
