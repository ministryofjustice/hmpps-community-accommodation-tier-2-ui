//  Feature: Referrer completes 'CPP details' page
//    So that I can complete the "HDC licence and CPP details" task
//    As a referrer
//    I want to complete the 'CPP details' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'CPP details' page
//
//  Scenario: view 'CPP details' page
//    Then I see the "CPP details" page
//
//  Scenario: navigate to task list on completion of task
//    When I complete the "CPP details" page
//    And I continue to the next task / page
//    Then I am taken to the non-standard licence conditions page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import CPPDetailsPage from '../../../../pages/apply/offence_and_licence_information/hdc-licence-and-cpp-details/cppDetails'
import NonStandardLicenceConditionsPage from '../../../../pages/apply/offence_and_licence_information/hdc-licence-and-cpp-details/nonStandardLicenceConditions'

context('Visit "CPP details" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['hdc-licence-and-cpp-details']
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

    // And I visit the 'CPP details' page
    // --------------------------------
    CPPDetailsPage.visit(this.application)
  })

  //  Scenario: view 'CPP details' page
  // ----------------------------------------------

  it('presents CPP details page', function test() {
    //  Then I see the "CPP details" page
    Page.verifyOnPage(CPPDetailsPage, this.application)
  })

  //  Scenario: navigate to CPP details page
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    // When I complete the "CPP details" page
    const page = Page.verifyOnPage(CPPDetailsPage, this.application)
    page.completeForm()

    // When I continue to the next task / page
    page.clickSubmit()

    // Then I am taken to the non-standard licence conditions page
    Page.verifyOnPage(NonStandardLicenceConditionsPage, this.application)
  })
})
