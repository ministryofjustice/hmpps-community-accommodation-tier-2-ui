//  Feature: Referrer completes 'Gang affiliations' page
//    So that I can complete the 'Area information' task
//    As a referrer
//    I want to complete the 'Gang affiliations' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'Gang affiliations' page
//
//  Scenario: view 'Gang affiliations' page
//    Then I see the "Gang affiliations" page
//
//  Scenario: navigates to the next task on completion of task
//    When I complete the "Gang affiliations" page
//    And I continue to the next task / page
//    Then I am taken to the "Family accommodation" page
//    And I see that the area information task is complete

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import GangAffiliationsPage from '../../../../pages/apply/area_and_funding/area_information/GangAffiliationsPage'
import FamilyAccommodationPage from '../../../../pages/apply/area_and_funding/area_information/FamilyAccommodationPage'

context('Visit "Gang affiliations" page', () => {
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

    // And I visit the 'Gang affiliations' page
    // --------------------------------
    GangAffiliationsPage.visit(this.application)
  })

  // Scenario: view 'Gang affiliations' page
  // ----------------------------------------------

  it('displays the page', function test() {
    // Then I see the "Gang affiliations" page
    Page.verifyOnPage(GangAffiliationsPage, this.application)
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

    //  When I complete the "Gang affiliations" page
    const page = Page.verifyOnPage(GangAffiliationsPage, this.application)
    page.completeForm()

    // When I continue to the next task / page
    page.clickSubmit()

    // Then I am taken to the "Family accommodation" page
    Page.verifyOnPage(FamilyAccommodationPage, this.application)
  })
})
